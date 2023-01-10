const express = require('express')
const {
    signupUser,
    loginUser,
    deleteUser
} = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//delete 
router.delete('/:id', deleteUser)

module.exports = router