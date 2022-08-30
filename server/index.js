import path from 'path'
import {fileURLToPath} from 'url'

import express, {json, urlencoded} from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import logger from 'morgan'
import dateFormat from 'dateformat'
import './config/mongo.config.js'

import message from './models/msg.js'

const app = express()
const port = 3000
const server = createServer(app)
const now = new Date()
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const io = new Server(server, {
    cors: {
    },
})

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({extended: false}))

let users = []
let messages = []

message.find((err, result) => {
    if (err) throw err
    messages = result
})

io.on('connection', (socket) => {
    socket.emit('initChat', {
        messages: messages,
    })

    socket.nickname = 'Mr. BoB'

    //listen on Change Username
    socket.on('enterUsername', (user) => {
        socket.nickname = user.nickname
        if (!users.find(obj=> obj.nickname === socket.nickname)) {
            users.push({id: socket.id, nickname: socket.nickname})
        }
        io.emit('userConnected', socket.nickname)
        io.emit('initChat', {
            messages: messages,
        })
        updateUsernames()
        console.log(`${socket.nickname} user connected`)
    })

    // Update Usernames on client side
    const updateUsernames = () => {
        io.emit('getUsers', {
            users: users
        })
    }

    // Listen on New Message
    socket.on('newMessage', (data) => {
        let msg = new message({
            userId: socket.id,
            message: data.message,
            nickname: socket.nickname,
            date: dateFormat(now, 'dd-mm-yyyy HH:MM'),
        })

        // Broadcast The New Message
        msg.save((err, result) => {
            if (err) throw err
            messages.push(result)
            io.emit('newMessage', result)
            io.emit('initChat', {
                messages: messages,
            })
        })
    })

    socket.on('isTyping', () => {
        socket.broadcast.emit('isTyping', socket.nickname)
    })
    socket.on('stopTyping', (data) => {
        socket.broadcast.emit('stopTyping', data)
    })

    socket.on('deleteOne', (data, err) => {
        message.deleteOne({_id: data._id})
        if (err) throw err
    })

    // Disconnect
    socket.on('disconnect', () => {
        io.emit('userDisconnected', socket.nickname)

        users = users.filter(function (user) {
            return user.id != socket.id
        })

        // Update the users list
        updateUsernames()
        console.log(`${socket.nickname} has leaved`)
    })
})

// Handle production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(dirname, './public/')))
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(dirname, './public/', 'index.html'))
    })
}

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
