import bcrypt from 'bcrypt';
import handlebars from 'handlebars';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';
import path from 'node:path';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import authService from '../services/auth.js';

import { COOKIES_CONFIG, SALT, SMTP } from '../constants.js';

import env from '../utils/env.js';
import sendMail from '../utils/sendMail.js';

const TEMPLATES_DIR = path.resolve('src', 'templates');

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    ...COOKIES_CONFIG,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('userId', session.userId, {
    ...COOKIES_CONFIG,
    expires: session.refreshTokenValidUntil,
  });
};

const register = async (req, res, next) => {
  const user = await authService.findUser({ email: req.body.email });
  if (user) return next(createHttpError(409, 'Email in use'));

  const hashedPassword = await bcrypt.hash(req.body.password, SALT);

  const createdUser = await authService.register({ ...req.body, password: hashedPassword });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: createdUser,
  });
};

const login = async (req, res, next) => {
  const user = await authService.findUser({ email: req.body.email });
  if (!user) return next(createHttpError(401, 'Email or password is incorrect'));

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordCorrect) return next(createHttpError(401, 'Email or password is incorrect'));

  const session = await authService.login(user._id);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const refresh = async (req, res, next) => {
  const { userId, refreshToken } = req.cookies;

  const session = await authService.findSession({ userId, refreshToken });
  if (!session) return next(createHttpError(401, 'Session not found'));

  if (Date.now() > new Date(session.refreshTokenValidUntil))
    return next(createHttpError(401, 'Session is expired'));

  const newSession = await authService.refreshSession(userId);

  setupSession(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newSession.accessToken,
    },
  });
};

const logout = async (req, res, next) => {
  const { userId } = req.cookies;
  if (!userId) return next(createHttpError(401, 'User ID is incorrect'));

  await authService.logout(userId);

  res.clearCookie('userId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;

  const user = await authService.findUser({ email });

  if (!user) next(createHttpError(404, 'User not found'));

  const token = jwt.sign(
    {
      id: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    }
  );

  const templatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');

  const templateSrc = (await fs.readFile(templatePath)).toString();

  const template = handlebars.compile(templateSrc);

  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/auth/reset-password?token=${token}`,
  });

  try {
    await sendMail({
      to: email,
      subject: 'Reset password',
      from: env(SMTP.FROM),
      html,
    });

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch {
    return next(createHttpError(500, 'Failed to send the email, please try again later.'));
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.query;

  if (!token) return next(createHttpError(401, 'Token is expired or invalid.'));

  if (!jwt.verify(token, env('JWT_SECRET')))
    return next(createHttpError(401, 'Token is expired or invalid.'));

  const { id } = jwt.decode(token);

  const user = await authService.findUser({ _id: id });

  if (!user) return next(createHttpError(404, 'User not found'));

  await authService.resetPassword(id, await bcrypt.hash(req.body.password, SALT));

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  logout: ctrlWrapper(logout),
  requestPasswordReset: ctrlWrapper(requestPasswordReset),
  resetPassword: ctrlWrapper(resetPassword),
};
