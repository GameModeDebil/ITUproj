const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    /*let emptyFields = []
    if (!password) {
        emptyFields.push('password')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the required fields.', emptyFields})
    }*/

    try {
        const user = await User.login(email, password)
        let role = user.role
        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, role})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const {name, password, email, company} = req.body

    /*let emptyFields = []
    if (!name) {
        emptyFields.push('name')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!company) {
        emptyFields.push('company')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the required fields.', emptyFields})
    }*/


    try {
        const user = await User.signup(name, password, email, company)
        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    signupUser,
    loginUser
}