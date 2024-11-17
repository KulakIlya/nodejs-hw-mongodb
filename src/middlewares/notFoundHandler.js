import createHttpError from 'http-errors';

const notFoundHandler = (_, _1, next) => next(createHttpError(404, 'Route not found'));

export default notFoundHandler;
