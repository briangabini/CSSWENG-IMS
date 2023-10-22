const express = require('express')
const {
    createInventoryItem,
    getInventoryItem,
    getInventoryItems,
    deleteInventoryItemById,
    updateInventoryItemById
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
router.delete('/delete-item/:id', deleteInventoryItemById) 

// UPDATE an inventory item 
router.patch('/update-item/:id', updateInventoryItemById) 

// place all the routes here for now

module.exports = router