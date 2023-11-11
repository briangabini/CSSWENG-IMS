const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


// login a user
const loginUser = async (req, res) => {
    const { email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        // other user data
        const employeeName = user.employeeName
        const role = user.role

        res.status(200).json({ email, role, employeeName, token })

        console.log(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/* TODO: Create a logout function for the user */


// get all verified users
const getVerifiedUsers = async (req, res) => {
    const userDetails = await User.find({}) // returns javascript object

    res.status(200).json(userDetails) // sends JSON response to the client
}

// get a single user using their employee name
const getVerifiedUser = async (req, res) => {
    const { employeeName } = req.params

    const userDetail = await User.findOne({ employeeName: employeeName })

    if (!userDetail) {
        return res.status(404).json({ error: 'No such employee is found!' })
    }

    res.status(200).json(userDetail)

}

// get a single user using their employee name
const getVerifiedUserByEmail = async (req, res) => {
    const { email } = req.params

    const userDetail = await User.findOne({ email })

    if (!userDetail) {
        return res.status(404).json({ error: 'No such employee is found!' })
    }

    res.status(200).json(userDetail)

}

// get a single user using id
const getVerifiedUserById = async (req, res) => {
    const { id } = req.params

    const userDetail = await User.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user is found!' })
    }

    if (!userDetail) {
        return res.status(404).json({ error: 'No such user is found!' })
    }

    res.status(200).json(userDetail)

}

// create new user 
const createVerifiedUser = async (req, res) => {
    const { email, password, employeeName, role } = req.body

    // add doc to db
    try {

        const user = await User.signup(email, password, employeeName, role)
        
        // create token
        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body // the client sends the email through POST request
    
        // Use mongoose to check if the partName value already exists in the database
        const existingEmail = await User.findOne({ email })

        console.log('Email retrieved: ', existingEmail)

        if (existingEmail) {
            // If email is found then there's a duplicate in the database
            return res.status(200).json({ isDuplicate: true })
        } else {
            // If no matching email is found then there's no duplicate in the database
            return res.status(200).json({ isDuplicate: false })
        }
    } catch (error) {
        console.error('An error occurred while checking for duplicates: ', error)
        return res.status(500).json({
            error: 'An error occurred while checking for duplicates.'
        })
    }
}

module.exports = {
    getVerifiedUsers,
    getVerifiedUser,
    createVerifiedUser,
    loginUser,
    checkEmail,
    getVerifiedUserByEmail
}