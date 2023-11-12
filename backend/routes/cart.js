const express = require('express')
const requireAuth = require('../middleware/requireAuth')
//const requireAuth = require('../middleware/requireAuth')
const {
    removeItemFromCart,
    addItemToCart
} = require('../controllers/cartController')


const {
    getInventory
} = require('../controllers/inventoryItemController')

const router = express.Router()

router.use(requireAuth)

//router.use(requireAuth)

router.get('/', getInventory)

// remove item from cart
router.post('/remove-item', removeItemFromCart)

// add item to cart
router.post('/add-item', addItemToCart)


module.exports = router