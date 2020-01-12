const db = require('../../services/db')

const addProduct = async (ctx) => {
    ctx.body = {
        test: 1
    }
}

module.exports = {
    addProduct
}