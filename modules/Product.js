const mongoose = require("mongoose");
const { type } = require("repair");

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema }