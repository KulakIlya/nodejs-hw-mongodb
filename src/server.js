import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import pino from 'pino-http';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';

import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

import { UPLOAD_DIR } from './constants.js';
import env from './utils/env.js';

const setupServer = () => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(env('PORT'));

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

export default setupServer;
