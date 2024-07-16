import Contact from '../db/models/contact.js';

import calculatePaginationData from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants.js';

const getAll = async ({
  userId,
  page,
  perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  type,
  isFavourite,
}) => {
  const skip = (page - 1) * perPage;

  const typeFilter = type ? { contactType: { $eq: type } } : {};
  const isFavouriteFilter = isFavourite !== undefined ? { isFavourite: { $eq: isFavourite } } : {};

  const contactsQuery = Contact.find({ userId, ...typeFilter, ...isFavouriteFilter });
  const contactsCount = await Contact.find({}).merge(contactsQuery).countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return { data: contacts, page, perPage, totalItems: contactsCount, ...paginationData };
};

const getOne = filter => Contact.findOne(filter);

const createContact = payload => Contact.create(payload);

const updateContact = (filter, payload) => Contact.findOneAndUpdate(filter, payload, { new: true });

const removeContact = filter => Contact.findOneAndDelete(filter);

export default { getAll, getOne, createContact, updateContact, removeContact };
