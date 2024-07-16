import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'userId is required'],
      ref: 'users',
    },
    accessToken: {
      type: String,
      required: [true, 'accessToken is required'],
    },
    refreshToken: {
      type: String,
      required: [true, 'refreshToken is required'],
    },
    accessTokenValidUntil: {
      type: Date,
      required: [true, 'accessTokenValidUntil is required'],
    },
    refreshTokenValidUntil: {
      type: Date,
      required: [true, 'refreshTokenValidUntil is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

const Session = mongoose.model('session', schema);

export default Session;
