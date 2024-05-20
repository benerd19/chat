const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")
const cors = require('cors')
const userRouter = require('./routes/user.route')
const chatRouter = require('./routes/chat.route')
const db = require('./db')

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
    socket.on('message', async (message) => {
        const data = await db.query(`insert into messages (text, users_email) values ('${message.text}', '${message.email}')`)
        const nickname = await db.query(`select nickname from users where email='${message.email}'`)
        io.emit('message', {id: data[0].insertId, text:message.text, users_email: message.email, nickname:nickname[0][0].nickname})
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnect')
    })
})

server.listen(3000, () => {
    console.log('Server start')
})
