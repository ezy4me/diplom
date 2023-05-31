const Router = require('express')

const router = new Router()

const furnitureController = require('../controllers/furnitureController')


router.get('/:id', furnitureController.getOne)
router.get('/', furnitureController.getAll)

router.post('/', furnitureController.create)

router.delete('/:id', furnitureController.deleteOne)

router.put('/', furnitureController.update)

module.exports = router 