const express = require('express')

const { 
    deleteChatMessage,
    createChatMessage
} = require('../controllers/chatMessageController')

const router = express.Router()

router.delete('/:id', deleteChatMessage)
router.post('/:id', createChatMessage)

module.exports = router