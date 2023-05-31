const Router = require('express')

const router = new Router()

const sizeController = require('../controllers/sizeController')


router.get('/:id', sizeController.getOne)
router.get('/', sizeController.getAll)

router.post('/', sizeController.create)

router.delete('/:id', sizeController.deleteOne)

router.put('/', sizeController.update)

module.exports = router 