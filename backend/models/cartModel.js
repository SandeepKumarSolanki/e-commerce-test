import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: Number,
      quantity: Number
    }
  ]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);