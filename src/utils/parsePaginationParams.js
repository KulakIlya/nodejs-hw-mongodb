const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';

  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) return defaultValue;

  return parsedNumber;
};

const parsePaginationParams = ({ page, perPage }) => ({
  page: parseNumber(page, 1),
  perPage: parseNumber(perPage, 10),
});

export default parsePaginationParams;
