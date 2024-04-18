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

productSchema.methods.addStock = function(quantity){
    this.stock += quantity;
    return this.save();
}

productSchema.methods.removeStock = function(quantity){
    this.stock -= quantity;
    return this.save();
}

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema }