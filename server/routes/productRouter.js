const Router = require('express')

const router = new Router()

const productController = require('../controllers/productController')


router.get('/:id', productController.getOne)
router.get('/', productController.getAll)

router.post('/', productController.create)

router.delete('/:id', productController.deleteOne)

router.put('/', productController.update)

module.exports = router 