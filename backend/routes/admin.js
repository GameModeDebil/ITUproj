const express = require('express')
const {
    getAdminTickets,
    getAdminUsers
} = require('../controllers/adminController')

const router = express.Router()

router.get('/tickets', getAdminTickets)

router.get('/users', getAdminUsers)

module.exports = router