import mongoose from 'mongoose';

import { CONTACT_TYPE_VALUES } from '../../constants.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'phoneNumber is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    isFavourite: {
      type: Boolean,
      required: [true, 'isFavourite is required'],
    },
    contactType: {
      type: String,
      enum: CONTACT_TYPE_VALUES,
      required: [true, 'contactType is required'],
      default: 'personal',
    },
    userId: {
      type: String,
      required: [true, 'userId is required'],
      ref: 'users',
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('contact', schema);
export default Contact;
