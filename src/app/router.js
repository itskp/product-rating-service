const koaRouter = require('koa-router')

const productRoutes = require('./product/router')
const ratingRoutes = require('./rating/router')

const router = new koaRouter()

router.use(productRoutes.routes(), productRoutes.allowedMethods())
router.use(ratingRoutes.routes(), ratingRoutes.allowedMethods())

module.exports = router