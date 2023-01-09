const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatMessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    belongToTicket: {
        type: mongoose.ObjectId, 
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('ChatMessage', chatMessageSchema)