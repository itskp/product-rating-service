const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/casaone', {
    // user: 'kapil-admin',
    // pass: 'dark-knight',
    // auth: {
    //     authdb: 'admin'
    // },
    config: {
        autoIndex: false
    },
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to MongoDb`)
}).catch((err) => {
    console.log(`Error connecting to Mongodb: ${err}`)
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = {
    products: mongoose.model('products', productSchema)
}