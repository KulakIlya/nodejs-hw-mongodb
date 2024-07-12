import express from 'express';
import contactsControllers from '../controllers/contacts.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAllContacts);
contactsRouter.get('/:id', contactsControllers.getContact);
contactsRouter.post('/', contactsControllers.createContact);
contactsRouter.patch('/:id', contactsControllers.updateContact);
contactsRouter.delete('/:id', contactsControllers.removeContact);

export default contactsRouter;
