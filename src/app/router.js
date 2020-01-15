'use strict'

const koaRouter = require('koa-router')

const productRoutes = require('./product/router')
const ratingRoutes = require('./rating/router')
const userRoutes = require('./user/router')

const router = new koaRouter()

router.use(productRoutes.routes(), productRoutes.allowedMethods())
router.use(ratingRoutes.routes(), ratingRoutes.allowedMethods())
router.use(userRoutes.routes(), userRoutes.allowedMethods())

module.exports = router
