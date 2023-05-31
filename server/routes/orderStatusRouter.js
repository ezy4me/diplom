const Router = require('express')

const router = new Router()

const orderStatusController = require('../controllers/orderStatusController')


router.get('/:id', orderStatusController.getOne)
router.get('/', orderStatusController.getAll)

router.post('/', orderStatusController.create)

router.delete('/:id', orderStatusController.deleteOne)

router.put('/', orderStatusController.update)

module.exports = router 