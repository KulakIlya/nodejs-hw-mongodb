import createHttpError from 'http-errors';
import contactService from '../services/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const getAllContacts = async (req, res, next) => {
  const contacts = await contactService.getAll();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getContact = async (req, res, next) => {
  const contact = await contactService.getOneById(req.params.id);

  if (!contact) return next(createHttpError(404, 'Contact not found'));

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${req.params.id}!`,
    data: contact,
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
};
