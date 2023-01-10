const express = require('express')
const {
    getUser,
    getMinUser,
    updateUser
} = require('../controllers/profileController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/:id', getUser)

router.get("/min/:id", getMinUser)

router.patch('/:id', updateUser)



module.exports = router