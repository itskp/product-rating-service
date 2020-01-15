'use strict'

const _ = require('ramda')
const crypto = require('crypto')

const wrapHandler = (handler) => {
    return async (ctx, next) => {
        try {
            const body = ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body
            const response = await handler(body, _.merge(ctx, {}), next)
            if (response.redirect) {
                ctx.redirect(response.redirect)
            }
            for (const key in response) {
                ctx[key] = response[key]
            }
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

const wrapSchema = (schema) => {
    return async (ctx, next) => {
        try {
            const body = ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body
            await schema.validateAsync(body)
            return next()
        } catch (err) {
            console.log(err)
            ctx.status = 500
            ctx.body = {
                error: err.details
            }
        }
    }
}

const httpResponse = (status, body) => {
    return {
        status,
        body: body || {}
    }
}

const generateRandomString = async (length = 20) => {
    const res = await crypto.randomBytes(length)
    return res.toString('hex')
}

module.exports = {
    wrapHandlers,
    httpResponse,
    generateRandomString,
    wrapSchema
}
