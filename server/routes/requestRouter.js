const Router = require('express')

const router = new Router()

const requestController = require('../controllers/requestController')


router.get('/:id', requestController.getOne)
router.get('/', requestController.getAll)

router.post('/', requestController.create)

router.delete('/:id', requestController.deleteOne)

router.put('/', requestController.update)

module.exports = router 