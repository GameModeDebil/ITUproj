const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.ObjectId,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    state: {
        type: Boolean,
        required: true
    },
    completion_date: {
        type: Date,
        required: false
    },
    internal: {
        type: Boolean,
        required: true
    },
    assigned_employee_id: {
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Ticket', ticketSchema)