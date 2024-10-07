import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'user',
    required: [true, 'userId is required'],
  },
  orderNumber: Number,
  foods: [
    {
      type: Schema.ObjectId,
      ref: 'food',
      required: [true, 'foods is required'],
    },
  ],
  totalPrice: String,
  process: {
    type: String,
    enum: ['active', 'waiting', 'process', 'delivered'],
    default: 'waiting',
  },
  createdDate: { type: Date, default: Date.now },
  district: { type: String, required: [true, 'district is required'] },
  Khoroo: { type: String, required: [true, 'khoroo is required'] },
  Apartment: { type: String, required: [true, 'Apartment is required'] },
  Description: { type: String, required: [true, 'description is required'] },
  PhoneNumber: { type: String, required: [true, 'PhoneNumber is required'] },
  MethodOfPay: { type: String, enum: ['cash', 'card'], default: 'cash' },
});

export const orderModel = model('order', orderSchema);
