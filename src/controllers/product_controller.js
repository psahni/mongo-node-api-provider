import Product from "../models/product.js";

// GET /v1/api/products
const getProducts = async (req, res) => {
    const products = await Product.find({});

    res.status(200).json(products);
}

// POST /v1/api/products

const createProduct = async (req, res) => {
    // const {name, description, in_stock } = req.body
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json({
          message: 'Product has been created successfully.',
          product: savedProduct
        });
      } catch (err) {
        res.status(500).send(err);
      }
}

export {
    getProducts,
    createProduct
}

