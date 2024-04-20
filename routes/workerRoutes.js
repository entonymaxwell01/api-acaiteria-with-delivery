const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController.js');

router.route('/register').post((req,res) => {
    workerController.create(req,res);
});

router.route('/').get((req,res) => {
    workerController.getAll(req,res);
});

router.route('/:id').get((req,res) => {
    workerController.getOne(req,res);
})


module.exports = router;