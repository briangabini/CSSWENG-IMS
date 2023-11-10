const express = require('express')
const {
    createVerifiedUser,
    getVerifiedUser,
    getVerifiedUsers,
    loginUser,
    checkEmail,
    getVerifiedUserByEmail
} = require('../controllers/userController')

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

// send a POST request to authenticate user in login page
router.post('/login', loginUser)

router.use(requireAuth)

// Mainly for testing, but basically calls the function that gets all users
router.get('/', getVerifiedUsers)

// GETs all verified users
router.get('/all-users', getVerifiedUsers)

// GETs a single user
router.get('/:employeeName', getVerifiedUser)   

// send a POST request to add user to database
router.post('/add-user', createVerifiedUser)

// send a POST request to check for email duplicates
router.post('/checkEmail', checkEmail)

// send a GET request to get a user using email
router.get('/getUserByEmail/:email', getVerifiedUserByEmail)

module.exports = router