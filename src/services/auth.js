import { randomBytes } from 'crypto';

import Session from '../db/models/session.js';
import User from '../db/models/user.js';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants.js';

const findUser = filter => User.findOne(filter);

const register = payload => User.create(payload);

const login = async userId => {
  const session = createSession();

  await deleteSession(userId);

  return Session.create({ userId, ...session });
};

const logout = userId => {
  return deleteSession(userId);
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

const findSession = filter => Session.findOne(filter);

const refreshSession = async userId => {
  const session = createSession();

  await deleteSession(userId);

  return Session.create({ userId, ...session });
};

const deleteSession = id => Session.deleteOne({ userId: id });

const resetPassword = async (id, newPassword) => {
  await deleteSession(id);

  return User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
};

export default {
  findUser,
  register,
  login,
  logout,
  findSession,
  createSession,
  refreshSession,
  resetPassword,
};
