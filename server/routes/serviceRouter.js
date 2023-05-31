const Router = require('express')

const router = new Router()

const serviceController = require('../controllers/serviceController')


router.get('/:id', serviceController.getOne)
router.get('/', serviceController.getAll)

router.post('/', serviceController.create)

router.delete('/:id', serviceController.deleteOne)

router.put('/', serviceController.update)

module.exports = router 