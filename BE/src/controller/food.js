import { foodModel } from '../schema/food.js';

export const createFood = async (req, res) => {
  const { name, image, ingeredient, price, discount, categoryId } = req.body;

  try {
    const response = await foodModel.create({
      name,
      image,
      ingeredient,
      price,
      discount,
      categoryId,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getFoods = async (req, res) => {
  try {
    const response = await foodModel.find().populate('categoryId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getFood = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await foodModel.findById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const foodDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await foodModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const FoodUpdate = async (req, res) => {
  const { id } = req.params;

  const { name, image, ingeredient, price, discount, categoryId } = req.body;

  try {
    const response = await foodModel.findByIdAndUpdate(id, {
      name,
      image,
      ingeredient,
      price,
      discount,
      categoryId,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
