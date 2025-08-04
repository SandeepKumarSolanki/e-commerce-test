import Cart from '../models/cartModel.js';

export const saveCart = async (req, res) => {
  try {
    const cart = new Cart({ items: req.body });
    const saved = await cart.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

