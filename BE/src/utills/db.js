import mongoose from 'mongoose';

export const Connect = async (uri) => {
  try {
    mongoose.connect(uri);
    console.log('Successfully');
  } catch (error) {
    console.log(error);
  }
};
