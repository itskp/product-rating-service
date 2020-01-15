const joi = require('@hapi/joi')

const addRating = joi.object().keys({
    productId: joi.string().min(3).max(10).required(),
    userId: joi.string().required(),
    rating: joi.number().min(1).max(5)
})

module.exports = {
    addRating
}