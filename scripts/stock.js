const db = require('../src/services/db')
const products = require('./data/products.json')
const users = require('./data/users.json')
const ratings = require('./data/ratings.json')

const init = async () => {
    // clean collections
    await db.products.deleteMany()
    await db.users.deleteMany()
    await db.ratings.deleteMany()

    // drop and sync indexes
    await db.products.syncIndexes()
    await db.users.syncIndexes()
    await db.ratings.syncIndexes()

    // add documents
    await db.products.create(products)
    await db.users.create(users)
    await db.ratings.create(ratings)
}

init().then(() => {
    console.log('success!')
}).catch((err) => {
    console.log('error - ', err)
}).finally(() => {
    process.exit(1)
})