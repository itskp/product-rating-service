const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))
const koaRouter = require('koa-router')

const moduleName = 'rating'

const router = new koaRouter({
    prefix: '/rating'
})

router.post('/', handler.getRatings)
router.post('/add', handler.addRating)

module.exports = router