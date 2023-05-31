const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const orderMiddleware = require('../middleware/orderMiddleware');

router
    .get('/:id', orderMiddleware.getOne, orderController.getOne)
    .get('/', orderController.getAll)
    .post('/', orderMiddleware.create, orderController.create)
    .delete('/:id', orderMiddleware.deleteOne, orderController.deleteOne)
    .put('/', orderMiddleware.update, orderController.update)

module.exports = router;