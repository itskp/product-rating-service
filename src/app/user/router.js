'use strict'

const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))
const schema = require('./schema')

const koaRouter = require('koa-router')

const router = new koaRouter({
    prefix: '/users'
})

router.post('/', util.wrapSchema(schema.addCustomer), handler.addCustomer)

module.exports = router
