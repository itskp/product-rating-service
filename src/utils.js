const _ = require('ramda')

const wrapHandler = (handler) => {
    return async (ctx, next) => {
        try {
            const response = await handler(ctx.request.body, _.merge(ctx, {}), next)
            if (response.redirect)
                ctx.redirect(response.redirect)
            for (const key in response)
                ctx[key] = response[key]
        } catch (err) {
            console.log(err)
            ctx.status = 500
            ctx.body = {
                error: 'Internal Server Error'
            }
        }
    }
}

const wrapHandlers = (module) => _.fromPairs(
    _.map(([name, fun]) => [name, wrapHandler(fun)],
        _.toPairs(module)))

const httpResponse = (status, body) => {
    return {
        status,
        body: body ? body : {}
    }
}

const generateRandomString = async (length = 20) => {
    const res = await crypto.randomBytes(length)
    return res.toString('hex')
}

module.exports = {
    wrapHandlers,
    httpResponse,
    generateRandomString
}