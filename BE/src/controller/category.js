import { categoryModel } from '../schema/category.js';

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const response = await categoryModel.create({ name });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCategories = async (req, res) => {
  try {
    const response = await categoryModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCategoriesAndFoods = async (req, res) => {
  try {
    const response = await categoryModel.aggregate([
      {
        $lookup: {
          from: 'foods',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'foods',
        },
      },
    ]);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const categoryUpdate = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  try {
    const response = await categoryModel.findByIdAndUpdate(id, {
      name,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const categoryDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await categoryModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
