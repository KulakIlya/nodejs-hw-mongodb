import { SORT_ORDER } from '../constants.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import Contact from './schemas/ContactSchema.js';

const getAll = async ({
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

  const contactsQuery = Contact.find({ ...typeFilter, ...isFavouriteFilter });
  const contactsCount = await Contact.find({}).merge(contactsQuery).countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return { data: contacts, page, perPage, totalItems: contactsCount, ...paginationData };
};

const getOneById = id => Contact.findById(id);

const createContact = payload => Contact.create(payload);

const updateContact = (id, payload) => Contact.findByIdAndUpdate(id, payload, { new: true });

const removeContact = id => Contact.findByIdAndDelete(id);

export default { getAll, getOneById, createContact, updateContact, removeContact };
