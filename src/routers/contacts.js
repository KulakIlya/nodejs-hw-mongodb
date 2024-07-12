import express from 'express';
import contactsControllers from '../controllers/contactsControllers.js';

const contactsRouter = express.Router();

contactsRouter.get('/contacts', contactsControllers.getAllContacts);
contactsRouter.get('/contacts/:id', contactsControllers.getContact);

export default contactsRouter;
