import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import authService from '../services/auth.js';

import { COOKIES_CONFIG, SALT } from '../constants.js';

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
    data: session.accessToken,
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
  });
};

const logout = async (req, res, next) => {
  const { userId } = req.cookies;
  if (!userId) return next(401, 'User ID is incorrect');

  await authService.logout(userId);

  res.clearCookie('userId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  logout: ctrlWrapper(logout),
};
