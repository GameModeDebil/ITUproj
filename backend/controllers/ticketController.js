const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all active tickets
const getTickets = async (req, res) => {
    const user = await User.findById(req.user._id)
    let tickets
    if(user.role == "employee"){
        tickets = await Ticket.find({}).sort({createdAt: -1})
    } else {
        tickets = await Ticket.find({ company: user.company }).sort({createdAt: -1})
    }
    res.status(200).json(tickets)
}

//get a single ticket
const getTicket = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ticket not found'})
    }
    const ticket = await Ticket.findById(id)
    if(!ticket){
        return res.status(404).json({error: 'Ticket not found'})
    }
    res.status(200).json(ticket)
}

//create new ticket
const createTicket = async (req, res) => {
    const {title, text, location, priority} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!text){
        emptyFields.push('text')
    }
    if(!location){
        emptyFields.push('location')
    }
    if(!priority){
        emptyFields.push('priority')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the required fields.', emptyFields})
    }
    //add doc to db
    try{
        const user = await User.findById(req.user._id)
        comments = "" //temp fix
        state = true   //temp fix
        internal = (user.company == "LS") ? true : false
        assigned_employee_id = null
        const ticket = await Ticket.create({title, text, company: user.company, creator: user._id, location, priority, comments, state, internal, assigned_employee_id})
        res.status(200).json(ticket)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a ticket
const deleteTicket = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ticket not found'})
    }
    const ticket = await Ticket.findOneAndDelete({_id: id})

    if(!ticket){
        return res.status(404).json({error: 'Ticket not found'})
    }

    res.status(200).json(ticket)
}

//update ticket
const updateTicket = async (req, res) => {
    const {id} = req.params

    const {title, text, location, priority, state} = req.body
    console.log(req.body)

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
        console.log("title")
    }
    if(!text){
        emptyFields.push('text')
        console.log("text")
    }
    if(!location){
        emptyFields.push('location')
        console.log("location")
    }
    if(!priority){
        emptyFields.push('priority')
        console.log("priority")
    }
    if(!state){
        emptyFields.push('state')
        console.log("state")
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the required fields.', emptyFields})
    }

    const ticket = await Ticket.findOneAndUpdate({_id: id}, {
        ...req.body
    })


    if(!ticket){
        return res.status(404).json({error: 'Ticket not found'})
    }

    res.status(200).json(ticket)
}

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}