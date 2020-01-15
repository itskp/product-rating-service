const joi = require('@hapi/joi')

const addProduct = joi.object().keys({
    productId: joi.string().min(3).max(10).required(),
    productName: joi.string().required()
})

module.exports = {
    addProduct
}
