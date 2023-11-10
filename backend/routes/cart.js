const express = require('express')
const {
    deleteCartItemById
} = require('../controllers/cartController')

// DELETE item from cart
router.delete('/delete-item/:id', deleteCartItemById) 

const router = express.Router()

module.exports = router