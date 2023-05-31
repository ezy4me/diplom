const express = require('express');
const router = express.Router();

const requestTypeController = require('../controllers/requestTypeController');
const requestTypeMiddleware = require('../middleware/requestTypeMiddleware');

router
    .get('/:id', requestTypeMiddleware.getOne, requestTypeController.getOne)
    .get('/', requestTypeController.getAll)
    .post('/', requestTypeMiddleware.create, requestTypeController.create)
    .delete('/:id', requestTypeMiddleware.deleteOne, requestTypeController.deleteOne)
    .put('/', requestTypeMiddleware.update, requestTypeController.update)

module.exports = router;
