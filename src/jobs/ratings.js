'use strict'

const db = require('../services/db')
const redis = require('../services/redis')
const cron = require('../services/cron')
const _ = require('ramda')

const syncRatings = async () => {
    const products = await db.products.find({}, {
        _id: 0,
        productId: 1
    })

    await Promise.all(products.map(async (product) => {
        const productId = product.productId
        const ratingbyGroup = await db.ratings.aggregate([
            {
                $match: {
                    productId: productId
                }
            }, {
                $group: {
                    _id: '$rating',
                    count: {
                        $sum: 1
                    }
                }
            }
        ])

        const ratings = _.map((rating) => {
            return {
                rating: rating._id,
                count: rating.count,
                value: rating._id * rating.count
            }
        }, ratingbyGroup)

        const average = _.sum(_.map((rating) => rating.value, ratings)) / 5.0

        redis.set(productId, JSON.stringify({
            ratings,
            average
        }))
    }))
}

module.exports = cron.initJob('*/30 * * * * *', syncRatings)
