const koa = require('koa')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const kcors = require('kcors')
const router = require('./app/router')
const redisServer = require('redis-server')
const task = require('./jobs')
const {
    responseTimestamp
} = require('./middlewares')

const init = () => {
    const app = new koa()
    const redis = new redisServer(6379)

    app.use(kcors())
    app.use(compress({
        level: 3
    }))

    app.use(responseTimestamp)

    app.use(koaBody({
        multipart: true
    }))

    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(3000)
    console.log('server listening on port 3000')

    redis.open().then(() => {
        console.log('redis server started')
    }).catch((err) => {
        console.log(`error starting redis server ${JSON.stringify(err)}`)
    })

    task.init()
}

module.exports = {
    init
}
