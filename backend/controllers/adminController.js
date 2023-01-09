const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

const getAdminTickets = async (req, res) => {
    const tickets = await Ticket.find({}).sort({createdAt: -1})
    res.status(200).json(tickets)
}

const getAdminUsers = async (req, res) => {
    const users = await User.find({}).sort({email: -1})
    res.status(200).json(users)
}

module.exports = {
    getAdminTickets,
    getAdminUsers
}