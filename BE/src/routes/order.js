import { Router } from 'express';
import { createOrder } from '../controller/order.js';

const order = Router();

order.post('/create', createOrder);

export default order;
