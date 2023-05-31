const express = require('express');
const router = express.Router();

const cutController = require('../controllers/cutController');
const cutMiddleware = require('../middleware/cutMiddleware')

router
    .get('/:id', cutMiddleware.getOne, cutController.getOne)
    .get('/', cutController.getAll)
    .post('/', cutMiddleware.create,cutController.create)
    .delete('/:id', cutMiddleware.deleteOne, cutController.deleteOne)
    .put('/', cutMiddleware.update, cutController.update)

module.exports = router;