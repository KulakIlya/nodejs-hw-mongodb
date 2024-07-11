import Contact from './schemas/ContactSchema.js';

const getAll = () => Contact.find({});

const getOneById = id => Contact.findById(id);

export default { getAll, getOneById };
