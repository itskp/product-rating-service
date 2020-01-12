const handler = require('./handler')
const koaRouter = require('koa-router')

const moduleName = 'product'

const router = new koaRouter({
    prefix: '/product'
})

router.get('/', async (ctx) => {
    ctx.body = {
        kapil: 1
    }
})
router.get('/add', handler.addProduct)

module.exports = router