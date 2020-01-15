const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))
const schema = require('./schema')

const koaRouter = require('koa-router')

const moduleName = 'user'

const router = new koaRouter({
    prefix: '/user'
})

router.post('/addCustomer', util.wrapSchema(schema.addCustomer), handler.addCustomer)

module.exports = router