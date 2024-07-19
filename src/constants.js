import path from 'node:path';

export const SORT_ORDER = { ASC: 'asc', DESC: 'desc' };

export const CONTACT_TYPE_VALUES = ['work', 'home', 'personal'];

export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const SALT = 10;

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const COOKIES_CONFIG = {
  httpOnly: true,
  secure: true,
};

export const SMTP = {
  HOST: 'SMTP_HOST',
  PORT: 'SMTP_PORT',
  USER: 'SMTP_USER',
  PASSWORD: 'SMTP_PASSWORD',
  FROM: 'SMTP_FROM',
};

export const TEMP_UPLOAD_DIR = path.resolve('temp');
export const UPLOAD_DIR = path.resolve('uploads');

export const CLOUDINARY = {
  ENABLED: 'ENABLE_CLOUDINARY',
  NAME: 'CLOUDINARY_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};
