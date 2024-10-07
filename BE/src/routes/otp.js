import { Router } from 'express';
import { CheckOTP, createOTP, NewPassword } from '../controller/otp.js';

const otp = Router();

otp
  .post('/create', createOTP)
  .post('/check', CheckOTP)
  .put('/newPassword', NewPassword);

export default otp;
