import express from 'express';

const productRoutes = express.Router();

import { getProducts, createProduct, updateQuantity } from '../controllers/product_controller.js'

productRoutes.get('/',  getProducts)
productRoutes.post('/', createProduct)
productRoutes.put('/:product_id/update_quantity', updateQuantity)

export default productRoutes;