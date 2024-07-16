import createHttpError from 'http-errors';

import authService from '../services/auth.js';

const authenticate = async (req, _, next) => {
  const [bearer, token] = req.get('Authorization').split(' ');

  if (bearer !== 'Bearer') return next(createHttpError(401, 'Invalid token'));

  const session = await authService.findSession({ accessToken: token });

  if (!session) return next(createHttpError(401, 'Session not found'));

  if (Date.now() > new Date(session.accessToken))
    return next(createHttpError(401, 'Session expired'));

  req.user = await authService.findUser({ _id: session.userId });
  next();
};

export default authenticate;
