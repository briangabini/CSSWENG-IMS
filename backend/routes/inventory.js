const express = require('express')
const {
    createInventoryItem,
    getInventoryItem,
    getInventoryItems
} = require('../controllers/inventoryItemController')

const router = express.Router()

// homepage - testing lang
router.get('/', getInventoryItems)

/* INVENTORY */

// GET all inventory items
router.get('/all-items', getInventoryItems)

// GET a single item
router.get('/:partName', getInventoryItem)

// POST an inventory item
router.post('/add-item', createInventoryItem)

// DELETE an inventory item
// router.delete('/delete-item/:partName', deleteInventoryItem) 

// UPDATE an inventory item 
// router.patch('/update-item/:partName', updateInventoryItem) 

// place all the routes here for now

module.exports = router