import express from 'express';

import contactsControllers from '../controllers/contacts.js';

import validateBody from '../middlewares/validateBody.js';
import validateId from '../middlewares/validateId.js';

import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/multer.js';
import validationSchemas from '../validation/contacts.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsControllers.getAllContacts);
contactsRouter.get('/:id', validateId, contactsControllers.getContact);
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(validationSchemas.createContact),
  contactsControllers.createContact
);
contactsRouter.patch(
  '/:id',
  validateId,
  upload.single('photo'),
  validateBody(validationSchemas.updateContact),
  contactsControllers.updateContact
);
contactsRouter.delete('/:id', validateId, contactsControllers.removeContact);

export default contactsRouter;
