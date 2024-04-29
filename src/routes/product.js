import express from 'express';

const productRoutes = express.Router();

import { getProducts } from '../controllers/product_controller.js'

productRoutes.get('/', getProducts)

export default productRoutes;