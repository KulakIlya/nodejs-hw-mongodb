import { CONTACT_TYPE_VALUES } from '../constants.js';

const parseType = type => (CONTACT_TYPE_VALUES.includes(type) ? type : null);

const parseIsFavourite = isFavourite => {
  const isString = typeof isFavourite === 'string';

  if (!isString) return null;

  if (isFavourite !== 'true' && isFavourite !== 'false') return null;

  return isFavourite === 'true' ? true : false;
};

const parseFilterParams = ({ type, isFavourite }) => {
  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  const filter = {};

  if (parsedType) filter.type = parsedType;
  if (parsedIsFavourite) filter.isFavourite = parsedIsFavourite;

  return filter;
};

export default parseFilterParams;
