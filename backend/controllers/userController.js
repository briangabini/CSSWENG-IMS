const User = require('../models/userModel')
const mongoose = require('mongoose')

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

// get a single user using id
const getVerifiedUserById = async (req, res) => {
    const { id } = req.params

    const userDetail = await User.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user is found!' })
    }

    if (!userDetail) {
        return res.status(404).json({error: 'No such user is found!'})
    }

    res.status(200).json(userDetail)

}

// create new user 
const createVerifiedUser = async (req,res) => {
    const {employeeName, password, emailAddress, role} = req.body

    // add doc to db
    try {

        const userDetail = await User.create({employeeName, password, emailAddress, role})
        res.status(200).json(userDetail)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getVerifiedUsers,
    getVerifiedUser,
    createVerifiedUser
}