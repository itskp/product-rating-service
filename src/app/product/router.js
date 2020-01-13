const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))
const schema = require('./schema')

const koaRouter = require('koa-router')

const moduleName = 'product'

const router = new koaRouter({
    prefix: '/product'
})

router.post('/add', util.wrapSchema(schema.addProduct), handler.addProduct)

module.exports = router