import multer from 'multer';

import { TEMP_UPLOAD_DIR } from '../constants.js';

const storage = multer.diskStorage({
  destination: (_, _1, cb) => {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: (_, file, cb) => {
    const uniqueId = Date.now();
    cb(null, `${uniqueId}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
