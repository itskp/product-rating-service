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
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        default: 'furniture'
    }
}, {
    versionKey: false,
    timestamps: true
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        default: 'customer'
    }
}, {
    versionKey: false,
    timestamps: true
})

const ratingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = {
    products: mongoose.model('products', productSchema),
    users: mongoose.model('users', userSchema),
    ratings: mongoose.model('ratings', ratingSchema)
}