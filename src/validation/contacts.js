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
  photo: Joi.string(),
});

const updateContact = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...CONTACT_TYPE_VALUES),
  photo: Joi.string(),
});

export default { createContact, updateContact };
