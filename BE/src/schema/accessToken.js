import { model, Schema } from 'mongoose';

export const accessTokenSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  accessToken: {
    type: String,
    required: [true, 'accessToken is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

export const accessTokenModel = model('accessToken', accessTokenSchema);
