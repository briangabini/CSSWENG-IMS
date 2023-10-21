const User = require('../models/userModel')
const mongoose = require('mongoose')

// create new user 
const createUser = async (req,res) => {
    const {employeeName, password, emailAddress, role} = req.body

    // add doc to db
    try {

        const user = await User.create({employeeName, password, emailAddress, role})
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}