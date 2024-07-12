import cors from 'cors';
import express from 'express';
import pino from 'pino-http';

import contactsRouter from './routers/contacts.js';

import errorHandler from './middlewares/errorHandler.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import env from './utils/env.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(env('PORT'));

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

export default setupServer;
