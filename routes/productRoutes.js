const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.route('/register').post((req,res) => {
    productController.create(req,res);
});

router.route('/').get((req,res) => {
    productController.getAll(req,res);
});

router.route('/:id').get((req,res) => {
    productController.getOne(req,res);
})

router.route('/:id').put((req,res) => {
    productController.update(req,res);
})

router.route('/:id').delete((req,res) => {
    productController.delete(req,res);
})

module.exports = router;