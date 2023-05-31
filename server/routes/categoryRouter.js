const Router = require('express')

const router = new Router()

const categoryController = require('../controllers/categoryController')


router.get('/:id', categoryController.getOne)
router.get('/', categoryController.getAll)

router.post('/', categoryController.create)

router.delete('/:id', categoryController.deleteOne)

router.put('/', categoryController.update)


module.exports = router 