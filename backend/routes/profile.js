const express = require('express')
const {
    getUser,
    getMinUser
} = require('../controllers/profileController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/:id', getUser)

router.get("/min/:id", getMinUser)

module.exports = router