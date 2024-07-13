import createHttpError from 'http-errors';
import mongoose from 'mongoose';

const validateId = (req, _, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return next(createHttpError(400, 'Id is not valid'));
  next();
};

export default validateId;
