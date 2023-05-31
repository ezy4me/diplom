const Router = require('express')

const router = new Router()

const paymentController = require('../controllers/paymentController')


router.get('/:id', paymentController.getOne)
router.get('/', paymentController.getAll)

router.post('/', paymentController.create)

router.delete('/:id', paymentController.deleteOne)

router.put('/', paymentController.update)

module.exports = router 