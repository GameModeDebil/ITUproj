const User = require('../models/userModel')
const mongoose = require('mongoose')

//get a single user
const getUser = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({error: 'User not found'})
    }
    const { password, verified, role, ...returnableUser} = user._doc;
    res.status(200).json(returnableUser)
}

module.exports = {
    getUser
}