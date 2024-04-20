const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController.js');

router.route('/register').post((req,res) => {
    workerController.create(req,res);
});


module.exports = router;