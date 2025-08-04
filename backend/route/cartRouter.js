import express from 'express';
import { saveCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/', saveCart);

export default router;