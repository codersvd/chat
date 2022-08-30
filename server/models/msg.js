import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    userId: String,
    nickname: String,
    message: String,
    date: String,
})

const message = mongoose.model('message', messageSchema)

export default message
