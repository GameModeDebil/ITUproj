const express = require('express')
const {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
} = require('../controllers/ticketController')
const requireAuth = require('../middleware/requireAuth')
const { 
    createChatMessage, 
    getChatMessages
} = require('../controllers/chatCommentController')

const router = express.Router()

//require auth for all ticket routes
router.use(requireAuth)

//GET all tickets
router.get('/', getTickets)

//GET a single ticket
router.get('/:id', getTicket)

//POST a new ticket
router.post('/', createTicket)

//DELETE a new ticket
router.delete('/:id', deleteTicket)

//UPDATE a new ticket
router.patch('/:id', updateTicket)

//ATTACH a comment to the ticket
router.post('/:id', createChatMessage)

//GET all comments attached to the ticket
router.get('/:id/cm', getChatMessages)


module.exports = router