const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const ChatMessage = require('../models/chatMessageModel')
const mongoose = require('mongoose')

// get all  chat messages that belong to to the current ticket
const getChatMessages = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ticket not found'})
    }
    const chatMessages = await ChatMessage.find({belongToTicket: id}).sort({createdAt: -1})
    res.status(200).json(chatMessages)
}

// create new chat message 
const createChatMessage = async (req, res) => {
    const {content} = req.body

    let emptyFields = []

    if(!content){
        emptyFields.push('content')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the required fields.', emptyFields})
    }

    //add doc to db
    try{
        const user = await User.findById(req.user._id)
        const {id} = req.params
        const chatMessage = await ChatMessage.create({content, creator: user.email, belongToTicket: id})
        res.status(200).json(chatMessage)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteChatMessage = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Message not found'})
    }
    const message = await ChatMessage.findOneAndDelete({_id: id})

    if(!message){
        return res.status(404).json({error: 'Message not found'})
    }

    res.status(200).json(message)
}

module.exports = {
    getChatMessages, 
    createChatMessage, 
    deleteChatMessage
}