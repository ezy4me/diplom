const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');
const paymentMiddleware = require('../middleware/paymentMiddleware');

router
    .get('/:id', paymentMiddleware.getOne, paymentController.getOne)
    .get('/', paymentController.getAll)
    .post('/', paymentMiddleware.create, paymentController.create)
    .delete('/:id', paymentMiddleware.deleteOne, paymentController.deleteOne)
    .put('/', paymentMiddleware.update, paymentController.update)

module.exports = router;
