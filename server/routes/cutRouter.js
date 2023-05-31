const Router = require('express')

const router = new Router()

const cutController = require('../controllers/cutController')


router.get('/:id', cutController.getOne)
router.get('/', cutController.getAll)

router.post('/', cutController.create)

router.delete('/:id', cutController.deleteOne)

router.put('/', cutController.update)

module.exports = router 