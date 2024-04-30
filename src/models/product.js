import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);
export default Product;