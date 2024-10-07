import { model, Schema } from 'mongoose';

const otpSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

export const otpModel = model('otp', otpSchema);
