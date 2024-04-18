const { Product: ProductModel,productSchema } = require("../modules/Product");


const productController = {
    create: async (req,res) => {
        try {

            const { code } = req.body;
            const productExists = await ProductModel.findOne({ code: code });

            if(productExists){
                res.status(409).json({msg: "Product already exists"});
                return
            }

            if(!req.body.name || !req.body.code || !req.body.describe || !req.body.price || !req.body.stock || !req.body.image){
                res.status(406).json({msg: "Missing required fields"});
                return;
            }


            const product = {
                name: req.body.name,
                code: req.body.code,
                describe: req.body.describe,
                price: req.body.price,
                stock: req.body.stock,
                image: req.body.image,
            }


            const response = await ProductModel.create(product);
            res.status(201).json({response, msg: "Product created successfully"});
        } catch (error) {
            console.log(error);
        }
    },

    getAll: async(req,res) => {
        try {
            const products = await ProductModel.find();
            res.status(200).json({products});
        } catch (error) {
            console.log(error);
        }
    },

    getOne: async(req,res) => {
        try {
            const product = await ProductModel.findById(req.params.id);

            if(!product){
                res.status(404).json({msg: "Product not found"});
                return;
            }

            res.status(200).json({product});
        } catch (error) {
            console.log(error);
        }
    }
}; 


module.exports = productController;