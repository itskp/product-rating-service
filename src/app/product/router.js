const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))

const koaRouter = require('koa-router')

const moduleName = 'product'

const router = new koaRouter({
    prefix: '/product'
})

router.post('/add', handler.addProduct)

module.exports = router