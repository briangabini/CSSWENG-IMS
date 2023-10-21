const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    employeeName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Partsman', 'Cashier', 'Secretary', 'Admin'],
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User

