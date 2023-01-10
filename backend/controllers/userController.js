const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        let role = user.role
        let id = user._id
        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, role, id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const {name, password, email, company} = req.body

    try {
        const user = await User.signup(name, password, email, company)
        let role = user.role
        let id = user._id

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, role, id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }
    const user = await User.findOneAndDelete({_id: id})

    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

module.exports = {
    signupUser,
    loginUser,
    deleteUser
}