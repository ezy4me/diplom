const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/serviceController');
const serviceMiddleware = require('../middleware/serviceMiddleware');

router
    .get('/:id', serviceMiddleware.getOne, serviceController.getOne)
    .get('/', serviceController.getAll)
    .post('/', serviceMiddleware.create, serviceController.create)
    .delete('/:id', serviceMiddleware.deleteOne, serviceController.deleteOne)
    .put('/', serviceMiddleware.update, serviceController.update)

module.exports = router;
