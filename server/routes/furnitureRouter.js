const express = require('express');
const router = express.Router();

const furnitureController = require('../controllers/furnitureController');
const furnitureMiddleware = require('../middleware/furnitureMiddleware');

router
    .get('/:id', furnitureMiddleware.getOne, furnitureController.getOne)
    .get('/', furnitureController.getAll)
    .post('/',furnitureMiddleware.create,  furnitureController.create)
    .delete('/:id', furnitureMiddleware.deleteOne, furnitureController.deleteOne)
    .put('/', furnitureMiddleware.update, furnitureController.update)

module.exports = router;