import { Router } from 'express';
import {
  categoryDelete,
  categoryUpdate,
  createCategory,
  getCategories,
  getCategoriesAndFoods,
} from '../controller/category.js';

const category = Router();

category
  .post('/create', createCategory)
  .get('/getCategories', getCategories)
  .get('/foods', getCategoriesAndFoods)
  .put('/categoryUpdate/:id', categoryUpdate)
  .delete('/categoryDelete/:id', categoryDelete);

export default category;
