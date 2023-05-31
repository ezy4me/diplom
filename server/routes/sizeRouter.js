const express = require('express');
const router = express.Router();

const sizeController = require('../controllers/sizeController');
const sizeMiddleware = require('../middleware/sizeMiddleware');

router
    .get('/:id', sizeMiddleware.getOne, sizeController.getOne)
    .get('/', sizeController.getAll)
    .post('/', sizeMiddleware.create, sizeController.create)
    .delete('/:id', sizeMiddleware.deleteOne, sizeController.deleteOne)
    .put('/', sizeMiddleware.update, sizeController.update)

module.exports = router;
