'use strict'

const db = require('../../services/db')
const {
    httpResponse
} = require('../../utils')

const addProduct = async ({
    productId,
    productName
}) => {
    const product = await db.products.findOne({
        productId
    }, {
        _id: 1
    })

    if (product) {
        return httpResponse(400, {
            error: 'product exists'
        })
    }

    await db.products.create({
        productId,
        name: productName
    })

    return httpResponse(200, {
        success: true
    })
}

module.exports = {
    addProduct
}
