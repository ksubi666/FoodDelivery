import { userModel } from '../schema/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = process.env.SALTROUND;

export const createUser = async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const response = await userModel.create({
      name,
      email,
      password: hash,
      phone,
      role,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await userModel.findById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const response = await userModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const UserUpdate = async (req, res) => {
  const { id } = req.params;

  const { name, email, password, phone, role } = req.body;

  try {
    const response = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      password,
      phone,
      role,
    });
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign({ ...response }, privateKey);

    return res.status(200).cookie('token', token).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await userModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
