'use strict'

const cron = require('cron')

const initJob = (cronInterval, syncHandler) => {
    return new cron.CronJob(cronInterval, async () => {
        console.log('executing cron task')
        await syncHandler().catch((err) => {
            console.log('executing cron task: FAILED', err)
        })
    })
}

module.exports = {
    initJob
}
