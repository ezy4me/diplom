const Router = require('express')

const router = new Router()

const orderController = require('../controllers/orderController')


router.get('/:id', orderController.getOne)
router.get('/', orderController.getAll)

router.post('/', orderController.create)

router.delete('/:id', orderController.deleteOne)

router.put('/', orderController.update)

module.exports = router 