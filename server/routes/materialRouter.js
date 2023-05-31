const Router = require('express')

const router = new Router()

const materialController = require('../controllers/materialController')


router.get('/:id', materialController.getOne)
router.get('/', materialController.getAll)

router.post('/', materialController.create)

router.delete('/:id', materialController.deleteOne)

router.put('/', materialController.update)

module.exports = router 