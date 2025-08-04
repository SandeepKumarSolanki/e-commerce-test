import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './config/connectDb.js';
import productRoutes from './route/productRouter.js';
import cartRoutes from './route/cartRouter.js';

await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
