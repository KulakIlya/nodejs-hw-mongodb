import express from 'express';

import contactsControllers from '../controllers/contacts.js';

import validateBody from '../middlewares/validateBody.js';
import validateId from '../middlewares/validateId.js';

import validationSchemas from '../schemas/contacts.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAllContacts);
contactsRouter.get('/:id', validateId, contactsControllers.getContact);
contactsRouter.post(
  '/',
  validateBody(validationSchemas.createContact),
  contactsControllers.createContact
);
contactsRouter.patch(
  '/:id',
  validateId,
  validateBody(validationSchemas.updateContact),
  contactsControllers.updateContact
);
contactsRouter.delete('/:id', validateId, contactsControllers.removeContact);

export default contactsRouter;
