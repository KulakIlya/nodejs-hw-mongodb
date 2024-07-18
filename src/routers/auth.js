import express from 'express';

import validateBody from '../middlewares/validateBody.js';

import authController from '../controllers/auth.js';

import authSchemas from '../validation/auth.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(authSchemas.register), authController.register);
authRouter.post('/login', validateBody(authSchemas.login), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);

export default authRouter;
