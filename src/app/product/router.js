const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))
const schema = require('./schema')

const koaRouter = require('koa-router')

// eslint-disable-next-line new-cap
const router = new koaRouter({
    prefix: '/products'
})

router.post('/', util.wrapSchema(schema.addProduct), handler.addProduct)

module.exports = router
