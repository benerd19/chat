const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")
const cors = require('cors')
const userRouter = require('./routes/user.route')
const chatRouter = require('./routes/chat.route')

app.use(express.json())
app.use(cors({origin: '*'}))
app.use('/users', userRouter)
app.use('/messages', chatRouter)

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('message', (message) => {
       io.emit('message', message)
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnect')
    })
})

server.listen(3000, () => {
    console.log('Server start')
})
