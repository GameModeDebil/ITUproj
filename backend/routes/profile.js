const express = require('express')
const {
    getUser,
} = require('../controllers/profileController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/:id', getUser)

module.exports = router