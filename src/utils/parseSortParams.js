import { SORT_ORDER } from '../constants.js';

const parseSortOrder = sortOrder => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);

  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = sortBy => {
  const contactKeys = ['_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType'];

  if (contactKeys.includes(sortBy)) return sortBy;

  return '_id';
};

const parseSortParams = ({ sortOrder, sortBy }) => {
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

export default parseSortParams;
