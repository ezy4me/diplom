const express = require('express');
const router = express.Router();

const orderStatusController = require('../controllers/orderStatusController');
const orderStatusMiddleware = require('../middleware/orderStatusMiddleware');


router
    .get('/:id', orderStatusMiddleware.getOne, orderStatusController.getOne)
    .get('/', orderStatusController.getAll)
    .post('/',  orderStatusMiddleware.create, orderStatusController.create)
    .delete('/:id', orderStatusMiddleware.deleteOne, orderStatusController.deleteOne)
    .put('/', orderStatusMiddleware.update,  orderStatusController.update)

module.exports = router;