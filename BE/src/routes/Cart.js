import { Router } from 'express';
import {
  createCart,
  deleteCartItem,
  getCart,
  getCarts,
  updateQuantity,
} from '../controller/cart.js';

const cart = Router();

cart
  .post('/create', createCart)
  .get('/getCart/:id', getCart)
  .get('/getCarts', getCarts)
  .post('/deleteCartItem', deleteCartItem)
  .put('/updateQuantity/:id', updateQuantity);

export default cart;
