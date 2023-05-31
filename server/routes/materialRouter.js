const express = require('express');
const router = express.Router();

const materialController = require('../controllers/materialController');
const materialMiddleware = require('../middleware/materialMiddleware');
const { getOne } = require('../controllers/userController');

router
    .get('/:id', materialMiddleware.getOne, materialController.getOne)
    .get('/', materialController.getAll)
    .post('/', materialMiddleware.create, materialController.create)
    .delete('/:id', materialMiddleware.deleteOne, materialController.deleteOne)
    .put('/', materialMiddleware.update, materialController.update)

module.exports = router;