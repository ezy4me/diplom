const Router = require('express')

const router = new Router()

const colorController = require('../controllers/colorController')


router.get('/:id', colorController.getOne)
router.get('/', colorController.getAll)

router.post('/', colorController.create)

router.delete('/:id', colorController.deleteOne)

router.put('/', colorController.update)

module.exports = router 