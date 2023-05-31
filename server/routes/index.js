const Router = require('express')

const router = new Router()

const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')

const requestRouter = require('./requestRouter')
const requestStatusRouter = require('./requestStatusRouter')
const requestTypeRouter = require('./requestTypeRouter')

const serviceRouter = require('./serviceRouter')
const orderStatusRouter = require('./orderStatusRouter')
const paymentRouter = require('./paymentRouter')
const saleRouter = require('./saleRouter')

const colorRouter = require('./colorRouter')
const materialRouter = require('./materialRouter')
const furnitureRouter = require('./furnitureRouter')
const sizeRouter = require('./sizeRouter')
const cutRouter = require('./cutRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')


router.use('/user', userRouter)
router.use('/order', orderRouter)

router.use('/request', requestRouter)
router.use('/requestStatus', requestStatusRouter)
router.use('/requestType', requestTypeRouter)


router.use('/service', serviceRouter)
router.use('/orderStatus', orderStatusRouter)
router.use('/payment', paymentRouter)
router.use('/sale', saleRouter)

router.use('/color', colorRouter)
router.use('/material', materialRouter)
router.use('/furniture', furnitureRouter)
router.use('/size', sizeRouter)
router.use('/cut', cutRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)


module.exports = router 