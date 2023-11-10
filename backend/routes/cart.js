const express = require('express')
const router = express.Router()

const {
    deleteCartItemById
} = require('../controllers/cartController')

// DELETE item from cart
router.delete('/delete-item/:id', deleteCartItemById) 


module.exports = router