import mongoose from 'mongoose';

import { EMAIL_REGEX } from '../../constants.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      match: [EMAIL_REGEX, 'email is not valid'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

schema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

const User = mongoose.model('user', schema);

export default User;
