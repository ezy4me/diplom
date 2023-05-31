const Router = require('express')

const router = new Router()

const requestTypeController = require('../controllers/requestTypeController')


router.get('/:id', requestTypeController.getOne)
router.get('/', requestTypeController.getAll)

router.post('/', requestTypeController.create)

router.delete('/:id', requestTypeController.deleteOne)

router.put('/', requestTypeController.update)

module.exports = router 