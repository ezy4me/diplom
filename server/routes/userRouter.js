const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userMiddleware = require('../middleware/userMiddleware');

router.post('/registration', userMiddleware.create, userController.create);
router.post('/login', userController.login);

router.route('/auth')
    .get(authMiddleware, userController.check);

router.route('/')
    .get(userController.getAll)
    .put(userMiddleware.update, userController.update);

router.route('/:id')
    .get(userMiddleware.getOne, userController.getOne)
    .delete(userMiddleware.deleteOne, userController.deleteOne);

module.exports = router;