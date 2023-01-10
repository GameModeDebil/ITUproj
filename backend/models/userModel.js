const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: false
    },
    company: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,   //temporary
        required: false
    },
    role: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(name, password, email, company) {
    //validation
    if(!name || !password || !email || !company) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is invalid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })
    if(exists){
        throw Error('Email already taken')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    profile_picture = "temp"    //temp fix
    role = (company == "LS") ? "employee" : "customer"
    phone = null
    verified = false

    const user = await this.create({ name, password: hash, email, phone, company, profile_picture, role, verified })

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if(!password || !email) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if(!user){
        throw Error('Incorrect credentials')
    }
    
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect credentials')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)