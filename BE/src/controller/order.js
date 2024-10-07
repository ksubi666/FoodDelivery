import { orderModel } from '../schema/order.js';
import { cartModel } from '../schema/cart.js';

export const createOrder = async (req, res, next) => {
  const {
    id,
    userId,
    foods,
    totalPrice,
    district,
    Khoroo,
    Apartment,
    Description,
    PhoneNumber,
    MethodOfPay,
  } = req.body;
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  try {
    const cart = await cartModel.findByIdAndDelete({ id });
    if (cart) {
      const response = await orderModel.create({
        userId,
        orderNumber: randomNumber,
        foods,
        totalPrice,
        process,
        district,
        Khoroo,
        Apartment,
        Description,
        PhoneNumber,
        MethodOfPay,
      });
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
