'use strict'

const db = require('../../services/db')
const {
    httpResponse
} = require('../../utils')
const _ = require('ramda')

const addRating = async ({
    productId,
    userId,
    rating
}) => {
    const product = await db.ratings.findOne({
        productId,
        userId
    })

    if (!product) {
        await db.ratings.create({
            productId,
            userId,
            rating
        })
        return httpResponse(200, {
        })
    }

    product.rating = rating
    product.save()

    return httpResponse(200, {
    })
}

const getRatings = async ({
    productId
}) => {
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

    return httpResponse(200, {
        result: ratings,
        average
    })
}
module.exports = {
    addRating,
    getRatings
}
