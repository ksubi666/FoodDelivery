import { userModel } from '../schema/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await userModel.findOne({ email });

    if (!response) return res.status(404).send('User not found');

    bcrypt.compare(password, response.password, (err, result) => {
      if (result) {
        const privateKey = process.env.JWT_PRIVATE_KEY;
        const token = jwt.sign({ ...response }, privateKey);

        return res.status(200).cookie('token', token).end();
      } else {
        return res.status(404).send('Incorrect email or password');
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
