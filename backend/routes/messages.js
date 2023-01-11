const express = require('express')

const { 
    deleteChatMessage,
    createChatMessage,
    updateChatMessage
} = require('../controllers/chatMessageController')

const router = express.Router()

router.delete('/:id', deleteChatMessage)
router.post('/:id', createChatMessage)
router.patch('/:id', updateChatMessage)

module.exports = router