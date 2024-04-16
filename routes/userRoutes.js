const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js'); 

// Rota para register de usuário
router.route('/register').post((req,res) => {
    userController.create(req,res);
})

router.route('/').get((req,res) => {
    userController.getAll(req,res);
});

router.route('/:id').get((req,res) => {
    userController.getOne(req,res);
});

router.route('/:id').put((req,res) => {
    userController.update(req,res);
});

router.route('/:id').delete((req,res) => {
    userController.delete(req,res);
});

router.route('/login').post((req,res) => {
    userController.login(req,res);
});

module.exports = router;
