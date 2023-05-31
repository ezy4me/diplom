const Router = require('express')

const router = new Router()

const requestStatusController = require('../controllers/requestStatusController')


router.get('/:id', requestStatusController.getOne)
router.get('/', requestStatusController.getAll)

router.post('/', requestStatusController.create)

router.delete('/:id', requestStatusController.deleteOne)

router.put('/', requestStatusController.update)

module.exports = router 