const handler = require('./handler')
const koaRouter = require('koa-router')

const moduleName = 'rating'

const router = new koaRouter({
    prefix: '/rating'
})

router.get('/add', handler.addRating)

module.exports = router