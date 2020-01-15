'use strict'

const config = {
    SERVER: {
        PORT: process.env.PORT || 3000,
        HOST: process.env.PORT || 'localhost'
    },
    REDIS: {
        REDIS_PORT: 6379,
        REDIS_URI: process.env.REDIS_URI || 'localhost'
    },
    MONGO: {
        DATABASE_NAME: process.env.DATABASE_NAME || 'casaone',
        MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/casaone'
    }
}

module.exports = {
    ...config
}
