const express = require('express')
const requireAuth = require('../middleware/requireAuth')
//const requireAuth = require('../middleware/requireAuth')
const {
    removeItemFromCart,
    addItemToCart
} = require('../controllers/cartController')

const router = express.Router()

router.use(requireAuth)

//router.use(requireAuth)

// remove item from cart
router.post('/remove-item', removeItemFromCart)

// add item to cart
router.post('/add-item', addItemToCart)


module.exports = router