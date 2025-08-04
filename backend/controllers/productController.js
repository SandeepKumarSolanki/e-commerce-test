import axios from 'axios';
import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const existing = await Product.find();
    if (existing.length > 0) return res.json(existing);

    const response = await axios.get('https://fakestoreapi.com/products');
    await Product.insertMany(response.data);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};