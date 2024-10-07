import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Connect } from './utills/db.js';
import user from './routes/User.js';
import auth from './routes/Auth.js';
import { sendMail } from './controller/mail.js';
import category from './routes/Category.js';
import food from './routes/Food.js';
import otp from './routes/otp.js';
import cart from './routes/Cart.js';
import order from './routes/order.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

const PORT = process.env.PORT;

app.use('/user', user);
app.use('/auth', auth);
app.use('/category', category);
app.use('/food', food);
app.use('/otp', otp);
app.use('/cart', cart);
app.use('/order', order);

app.listen(PORT, () => {
  Connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('listening port', PORT);
});
