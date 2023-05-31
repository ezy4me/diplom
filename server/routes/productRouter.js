const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const productMiddleware = require('../middleware/productMiddleware');

router
    .get('/:id', productMiddleware.getOne, productController.getOne)
    .get('/', productController.getAll)
    .post('/', productMiddleware.create, productController.create)
    .delete('/:id', productMiddleware.deleteOne, productController.deleteOne)
    .put('/', productMiddleware.update, productController.update)

module.exports = router;