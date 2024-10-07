import { Router } from 'express';
import {
  createFood,
  foodDelete,
  FoodUpdate,
  getFood,
  getFoods,
} from '../controller/food.js';

const food = Router();

food
  .post('/create', createFood)
  .get('/getFoods', getFoods)
  .get('/getFood/:id', getFood)
  .delete('/foodDelete/:id', foodDelete)
  .put('/foodUpdate/:id', FoodUpdate);

export default food;
