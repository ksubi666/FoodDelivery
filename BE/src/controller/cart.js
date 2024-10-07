import { cartModel } from '../schema/cart.js';

export const createCart = async (req, res) => {
  const { quantity, productId, userId, _id } = req.body;

  try {
    const cart = await cartModel.findById(_id);
    if (!cart) {
      const response = await cartModel.create({
        products: { productId, quantity },
        userId,
      });
      return res.status(200).json(response);
    }

    cart.products.push({ productId, quantity });

    await cart.save();

    return res.send(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity, productId } = req.body;

  try {
    const cart = await cartModel.findById(id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      { 'products.productId': productId },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getCart = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await cartModel
      .findById(id)
      .populate({
        path: 'products.productId',
        model: 'food',
      })
      .populate('userId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCarts = async (req, res) => {
  try {
    const response = await cartModel
      .find()
      .populate({
        path: 'products.productId',
        model: 'food',
      })
      .populate('userId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const deleteCartItem = async (req, res) => {
  const { productId, id } = req.body;

  try {
    const cart = await cartModel.findById(id);
    if (!cart) {
      return res
        .status(404)
        .json({ message: 'Cart not found or product not in cart.' });
    }

    cart.products.pull({ productId });

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
