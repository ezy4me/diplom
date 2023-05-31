const Router = require('express')

const router = new Router()

const saleController = require('../controllers/saleController')


router.get('/:id', saleController.getOne)
router.get('/', saleController.getAll)

router.post('/', saleController.create)

router.delete('/:id', saleController.deleteOne)

router.put('/', saleController.update)

module.exports = router 