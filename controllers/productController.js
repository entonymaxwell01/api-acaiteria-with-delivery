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
    },

    update: async (req,res) => {
        try {
            const product = {
                name: req.body.name,
                code: req.body.code,
                describe: req.body.describe,
                price: req.body.price,
                stock: req.body.stock,
                image: req.body.image,
            }

            const productExists = await ProductModel.findById(req.params.id);

            if(!productExists){
                res.status(404).json({msg: "Product not found"});
                return;
            }

            if(!req.body.name || !req.body.code || !req.body.describe || !req.body.price || !req.body.stock || !req.body.image){
                res.status(406).json({msg: "Missing required fields"});
                return;
            }

            const newProduct = await ProductModel.findByIdAndUpdate(req.params.id,product);

            res.status(200).json({newProduct,msg: "Product updated successfully"});

        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req,res) => {
        try {
            const product = await ProductModel.findById(req.params.id);

            if(!product){
                res.status(404).json({msg: "Product not found"});
                return;
            }

            const productDeleted = await ProductModel.findByIdAndDelete(req.params.id);
            res.status(200).json({productDeleted,msg: "Product deleted successfully"});

        } catch (error) {
            console.log(error);
        }
    },
    addStock: async (req,res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            const { quantity } = req.body;
            if(!product){
                res.status(404).json({msg: "Product not found"});
                return;
            }

            if(quantity <= 0){
                res.status(406).json({quantity,msg: "Missing required fields"});
                return;
            }

            const response = await product.addStock(quantity);
            res.status(200).json({response, msg: `${quantity} unit added to stock`});

        } catch (error) {
            console.log(error);
        }
    }
}; 


module.exports = productController;