import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';

import createHttpError from 'http-errors';
import { SWAGGER_PATH } from '../constants.js';

const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    return (_, _1, next) => next(createHttpError(500, "Can't load swagger docs"));
  }
};

export default swaggerDocs;
