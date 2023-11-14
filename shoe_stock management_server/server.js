
    const express = require('express')
    const cors = require('cors')
    const expressApp = express()

    const api = require('./api')

    expressApp.use(cors({ origin: true }))
    expressApp.use(express.json())

    const { injectDB } = require('./middleware')

    expressApp.use(injectDB)
    expressApp.use('/api', api)
    const socket = require("socket.io")
    const http = require("http")



    const server = http.createServer(expressApp);
    const socketio = new socket.Server(server, { cors: { origin: '*' } });
    expressApp.set('socketio', socketio);

    server.listen(5050, () => {
        console.log(`Node server running on 5050`)
    })


module.exports = expressApp;
