const db = require('../src/services/db')
const products = require('./data/products.json')

const init = async () => {
    // clean collections
    await db.products.deleteMany()
    
    // create indexes
    await db.products.createIndexes()

    // add documents
    await db.products.create(products)
}

init().then(() => {
    console.log('success!')
}).catch((err) => {
    console.log('error - ', err)
}).finally(() => {
    process.exit(1)
})