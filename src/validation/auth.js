import Joi from 'joi';
import { EMAIL_REGEX } from '../constants.js';

const register = Joi.object({
  name: Joi.string().required('name is required'),
  email: Joi.string().pattern(EMAIL_REGEX).required('email is required'),
  password: Joi.string().required('password is required'),
});

const login = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  password: Joi.string().required(),
});

export default {
  register,
  login,
};
