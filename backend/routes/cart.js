const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {deleteCartItemById} = require('../controllers/cartController')

const router = express.Router()

router.use(requireAuth)

// DELETE item from cart
router.delete('/delete-item/:id', deleteCartItemById)


module.exports = router