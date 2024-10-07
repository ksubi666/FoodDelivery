import { accessTokenModel } from '../schema/accessToken.js';
import { otpModel } from '../schema/otp.js';
import { userModel } from '../schema/user.js';
import { sendMail } from './mail.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

export const createOTP = async (req, res) => {
  const { email } = req.body;
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  try {
    const checkEmail = await userModel.findOne({ email });

    if (!checkEmail) return res.status(404).send('User not found');

    const response = await otpModel.create({
      email: email,
      otp: randomNumber,
    });
    await sendMail({
      to: 'ksubi666@gmail.com',
      otp: randomNumber,
    });
    return res.status(200).json({ success: true, email: checkEmail.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const CheckOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const response = await otpModel.findOneAndDelete({ email, otp });

    if (!response) return res.status(404).send('OTP not found');

    if (response) {
      const token = await accessTokenModel.create({
        email,
        accessToken: nanoid(),
      });
      return res
        .status(200)
        .json({ success: true, accessToken: token.accessToken });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const NewPassword = async (req, res) => {
  const { email, accessToken, password } = req.body;
  const saltRounds = process.env.SALTROUND;

  try {
    const response = await accessTokenModel.findOneAndDelete({
      email,
      accessToken,
    });

    if (!response) return res.status(404).send('accessToken not found');

    if (response.accessToken === accessToken) {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);

      await userModel.updateOne({ email }, { password: hash });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
