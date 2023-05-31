const express = require('express');
const router = express.Router();

const requestStatusController = require('../controllers/requestStatusController');
const requestStatusMiddleware = require('../middleware/requestStatusMiddleware');

router
    .get('/:id', requestStatusMiddleware.getOne, requestStatusController.getOne)
    .get('/', requestStatusController.getAll)
    .post('/', requestStatusMiddleware.create, requestStatusController.create)
    .delete('/:id', requestStatusMiddleware.deleteOne, requestStatusController.deleteOne)
    .put('/', requestStatusMiddleware.update, requestStatusController.update)

module.exports = router;