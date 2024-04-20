const router = require('express').Router();

const userRoutes = require('./userRoutes');

const productRoutes = require('./productRoutes')

const workerRoutes = require('./workerRoutes');

router.use('/user',userRoutes);

router.use('/product',productRoutes);

router.use('/worker',workerRoutes);


module.exports = router;