'use strict'

const syncRatings = require('./ratings')

const init = () => {
    syncRatings.start()
}
module.exports = {
    init
}
