import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
  },
});

export const categoryModel = model('category', categorySchema);
