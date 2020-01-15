const util = require('../../utils')
const handler = util.wrapHandlers(require('./handler'))
const koaRouter = require('koa-router')
const schema = require('./schema')

// eslint-disable-next-line new-cap
const router = new koaRouter({
    prefix: '/products/ratings'
})

router.get('/', util.wrapSchema(schema.getRatings), handler.getRatings)
router.post('/', util.wrapSchema(schema.addRating), handler.addRating)

module.exports = router
