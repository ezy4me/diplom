const express = require('express');
const router = express.Router();

const saleController = require('../controllers/saleController');
const saleMiddleware = require('../middleware/saleMiddleware');

router
    .get('/:id', saleMiddleware.getOne, saleController.getOne)
    .get('/', saleController.getAll)
    .post('/', saleMiddleware.create, saleController.create)
    .delete('/:id', saleMiddleware.deleteOne, saleController.deleteOne)
    .put('/', saleMiddleware.update, saleController.update)

module.exports = router;
