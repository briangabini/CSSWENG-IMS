const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { // email address needs to be a unique identifier
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Partsman', 'Cashier', 'Secretary', 'Admin'],
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'dateAdded', // Use `created_at` to store the created date
        updatedAt: 'dateModified' // and `updated_at` to store the last updated date
    }
})

// static signup method
userSchema.statics.signup = async function (email, password, employeeName, role) {

    //validation
    if (!email || !password) { // checks if fields are empty
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) { // checks if the format is in email format
        throw Error('Email is not valid')
    }

    // ALL the parameters needs to be changed; all the fields must be present, removing one causes an error.
    /* if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
        throw Error('Password not strong enough')
    } */

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, employeeName, role })

    return user
}


// static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}


const User = mongoose.model('User', userSchema)

module.exports = User

