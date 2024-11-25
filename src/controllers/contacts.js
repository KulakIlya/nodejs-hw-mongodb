import createHttpError from 'http-errors';

import contactService from '../services/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import env from '../utils/env.js';
import parseFilterParams from '../utils/parseFilterParams.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import saveToCloudinary from '../utils/saveToCloudinary.js';

import { CLOUDINARY } from '../constants.js';

const getPhotoURL = file => {
  if (!file) return;

  if (env(CLOUDINARY.ENABLED) === 'true') return saveToCloudinary(file);

  return saveFileToUploadDir(file);
};

const getAllContacts = async (req, res) => {
  const { perPage, page, sortBy, sortOrder, type, isFavourite } = req.query;

  const data = await contactService.getAll({
    userId: req.user._id,
    ...parsePaginationParams({ perPage, page }),
    ...parseSortParams({ sortBy, sortOrder }),
    ...parseFilterParams({ type, isFavourite }),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      ...data,
    },
  });
};

const getContact = async (req, res, next) => {
  const contact = await contactService.getOne({ _id: req.params.id, userId: req.user._id });

  if (!contact) return next(createHttpError(404, 'Contact not found'));

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${req.params.id}!`,
    data: contact,
  });
};

const createContact = async (req, res) => {
  const photo = await getPhotoURL(req.file);

  const newContact = await contactService.createContact({
    userId: req.user._id,
    ...req.body,
    photo,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

const updateContact = async (req, res, next) => {
  const photo = await getPhotoURL(req.file);

  const newContact = await contactService.updateContact(
    { _id: req.params.id, userId: req.user._id },
    { ...req.body, photo }
  );

  if (!newContact) return next(createHttpError(404, 'Contact not found'));

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: newContact,
  });
};

const removeContact = async (req, res, next) => {
  const removedContact = await contactService.removeContact({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!removedContact) return next(createHttpError(404, 'Contact not found'));

  res.status(204).send();
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
