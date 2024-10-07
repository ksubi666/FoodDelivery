import { model, Schema } from 'mongoose';

const foodSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  image: { type: String },
  ingeredient: { type: String },
  price: { type: Number, required: [true, 'Price is required'] },
  discount: { type: Number, default: 0 },
  categoryId: {
    type: Schema.ObjectId,
    ref: 'category',
    required: [true, 'CategoryId is required'],
  },
});

export const foodModel = model('food', foodSchema);
