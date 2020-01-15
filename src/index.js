const app = require('./app')

try {
    console.log('Starting Server')
    app.init()
} catch (err) {
    console.log('Server start failed')
    console.log(JSON.stringify(err))
    process.exit(1)
}
