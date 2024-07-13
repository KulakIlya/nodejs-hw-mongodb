import mongoose from 'mongoose';

import { CONTACT_TYPE_VALUES } from '../../constants.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    isFavourite: {
      type: Boolean,
      required: [true, 'IsFavourite is required'],
    },
    contactType: {
      type: String,
      enum: CONTACT_TYPE_VALUES,
      required: [true, 'ContactType is required'],
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('contact', schema);
export default Contact;
