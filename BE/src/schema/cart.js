import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
  products: [
    {
      quantity: { type: Number, default: 1 },
      productId: {
        type: Schema.ObjectId,
        ref: 'food',
        required: [true, 'productId is required'],
      },
    },
  ],
  userId: {
    type: Schema.ObjectId,
    ref: 'user',
    required: [true, 'userId is required'],
  },
});

export const cartModel = model('cart', cartSchema);
