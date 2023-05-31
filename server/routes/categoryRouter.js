const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const categoryMiddleware = require('../middleware/categoryMiddleware')

router
    .get('/:id', categoryMiddleware.getOne, categoryController.getOne)
    .get('/', categoryController.getAll)
    .post('/', categoryMiddleware.create, categoryController.create)
    .delete('/:id', categoryMiddleware.deleteOne, categoryController.deleteOne)
    .put('/', categoryMiddleware.update, categoryController.update);

module.exports = router;