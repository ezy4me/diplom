const express = require('express');
const router = express.Router();

const colorController = require('../controllers/colorController');
const colorMiddleware = require('../middleware/colorMiddleware')

router
    .get('/:id', colorMiddleware.getOne, colorController.getOne)
    .get('/', colorController.getAll)
    .post('/', colorMiddleware.create ,colorController.create)
    .delete('/:id', colorMiddleware.deleteOne ,colorController.deleteOne)
    .put('/', colorMiddleware.update ,colorController.update)

module.exports = router;