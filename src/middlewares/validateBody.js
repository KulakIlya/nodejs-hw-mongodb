import createHttpError from 'http-errors';

const validateBody = schema => async (req, _, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(createHttpError(400, 'Bad request', { errors: error.details }));
  }
};

export default validateBody;
