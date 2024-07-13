import Joi from 'joi';

import { CONTACT_TYPE_VALUES } from '../constants.js';

const createContact = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...CONTACT_TYPE_VALUES)
    .required(),
});

export default { createContact };
