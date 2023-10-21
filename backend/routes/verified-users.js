const express = require('express')
const {
    createVerifiedUser,
    getVerifiedUser,
    getVerifiedUsers
} = require('../controllers/userController')

const router = express.Router()

// homepage - testing lang
router.get('/', getVerifiedUsers)

/* INVENTORY */

// GET all inventory items
router.get('/all-users', getVerifiedUsers)

// GET a single item
router.get('/:employeeName', getVerifiedUser)   

// POST an inventory item
router.post('/add-user', createVerifiedUser)

// DELETE an inventory item

// UPDATE an inventory item 
// router.patch('/update-item/:partName', updateInventoryItem) 

// place all the routes here for now

module.exports = router