const express = require('express')
const requireAuth = require('../middleware/requireAuth')
//const requireAuth = require('../middleware/requireAuth')
const {
    // removeItemFromCart,
    // addItemToCart,
    getCartById,
    getCartDetailsByUserId,
    deductItemFromCart,
    addItemToCart, 
    cancelOrder,
    confirmOrder,
    deleteItems,
    createCart,
    getTotalCartQuantity, 
    updateTransactionType


} = require('../controllers/cartController')


const {
    getInventory
} = require('../controllers/inventoryItemController')

const router = express.Router()

router.use(requireAuth)

//router.use(requireAuth)

router.get('/', getInventory)

// get user's cart
// router.get('/:id', getCartById)

router.get('/getCartDetailsByUserId/:userId', getCartDetailsByUserId)

router.post('/deductItemFromCart', deductItemFromCart)

router.post('/addItemToCart', addItemToCart)

router.delete('/cancelOrder', cancelOrder)

router.post('/confirmOrder', confirmOrder)

router.delete('/deleteItems', deleteItems)

router.post('/createCart', createCart)

router.get('/getTotalCartQuantity/:userId', getTotalCartQuantity)

// router.post('/updateTransactionType', updateTransactionType)

// remove item from cart
// router.post('/remove-item', removeItemFromCart)

// add item to cart
// router.post('/add-item', addItemToCart)


module.exports = router