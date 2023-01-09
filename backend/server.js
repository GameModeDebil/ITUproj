require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const ticketRoutes = require('./routes/tickets')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const profileRoutes = require('./routes/profile')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/tickets', ticketRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/profile', profileRoutes)

//connect to db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
    })
    })
    .catch((error) => {
        console.log(error)
    })