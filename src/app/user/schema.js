const joi = require('@hapi/joi')

const addCustomer = joi.object().keys({
    userId: joi.string().min(3).max(10).required(),
    name: joi.string().required()
})

module.exports = {
    addCustomer
}