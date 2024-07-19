import { v2 as cloudinary } from 'cloudinary';

import { CLOUDINARY } from '../constants.js';
import env from '../utils/env.js';

cloudinary.config({
  secure: true,
  cloud_name: env(CLOUDINARY.NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

const saveToCloudinary = async file => {
  const uploadResult = await cloudinary.uploader.upload(file.path);

  return uploadResult.secure_url;
};

export default saveToCloudinary;
