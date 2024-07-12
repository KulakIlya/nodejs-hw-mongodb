import Contact from './schemas/ContactSchema.js';

const getAll = () => Contact.find({});

const getOneById = id => Contact.findById(id);

const createContact = payload => Contact.create(payload);

const updateContact = (id, payload) => Contact.findByIdAndUpdate(id, payload, { new: true });

const removeContact = id => Contact.findByIdAndDelete(id);

export default { getAll, getOneById, createContact, updateContact, removeContact };
