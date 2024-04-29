import Product from "../models/product.js";

// GET /v1/api/products
const getProducts = async (req, res) => {
    const products = await Product.find({});

    res.status(200).json(products);
}

// POST /v1/api/products

const createProduct = async (req, res) => {

}

export {
    getProducts
}

