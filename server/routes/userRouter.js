const Router = require('express')

const router = new Router()

const userController = require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.create)
router.post('/login', userController.login)

router.get('/auth', authMiddleware, userController.check)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)

router.delete('/:id', userController.deleteOne)
router.put('/', userController.update)

module.exports = router 