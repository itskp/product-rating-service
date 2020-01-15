const db = require('../../services/db')
const {
    httpResponse
} = require('../../utils')

const addCustomer = async ({
    userId,
    name
}) => {
    const user = await db.users.findOne({
        userId
    }, {
        _id: 1
    })

    if(user) {
        return httpResponse(400, {
            error: 'user exists'
        })
    }

    await db.users.create({
        userId,
        name
    })

    return httpResponse(200, {
        'success': true
    })
}

module.exports = {
    addCustomer
}