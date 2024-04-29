import express from 'express';

const productRoutes = express.Router();

import { getProducts, createProduct } from '../controllers/product_controller.js'

productRoutes.get('/',  getProducts)
productRoutes.post('/', createProduct)


export default productRoutes;