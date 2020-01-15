const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))
const koaRouter = require('koa-router')
const schema = require('./schema')

const moduleName = 'rating'

const router = new koaRouter({
    prefix: '/rating'
})

router.get('/', handler.getRatings)
router.post('/add', util.wrapSchema(schema.addRating), handler.addRating)

module.exports = router