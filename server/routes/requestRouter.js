const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');
const requestMiddleware = require('../middleware/requestMiddleware');

router
    .get('/:id', requestMiddleware.getOne, requestController.getOne)
    .get('/', requestController.getAll)
    .post('/', requestMiddleware.create, requestController.create)
    .delete('/:id', requestMiddleware.deleteOne, requestController.deleteOne)
    .put('/', requestMiddleware.update, requestController.update)

module.exports = router;
