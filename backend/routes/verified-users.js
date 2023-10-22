const express = require('express')
const {
    createVerifiedUser,
    getVerifiedUser,
    getVerifiedUsers,
    loginUser
} = require('../controllers/userController')

const router = express.Router()


// Mainly for testing, but basically calls the function that gets all users
router.get('/', getVerifiedUsers)

// GETs all verified users
router.get('/all-users', getVerifiedUsers)

// GETs a single user
router.get('/:employeeName', getVerifiedUser)   

// send a POST request to add user to database
router.post('/add-user', createVerifiedUser)

// send a POST request to authenticate user in login page
router.post('/login', loginUser)

module.exports = router