const express = require('express')
const {
    createInventoryItem,
    getInventoryItem,
    getInventoryItems,
    deleteInventoryItemById,
    updateInventoryItemById,
    searchInventoryItemByPartname
} = require('../controllers/inventoryItemController')

const router = express.Router()

// homepage - testing lang
router.get('/', getInventoryItems)

/* INVENTORY */

// GET all inventory items
router.get('/all-items', getInventoryItems)

// // GET a single item
// router.get('/:partName', getInventoryItem)   

// POST an inventory item
router.post('/add-item', createInventoryItem)

// DELETE an inventory item
router.delete('/delete-item/:id', deleteInventoryItemById) 

// UPDATE an inventory item 
router.patch('/edit-item/:id', updateInventoryItemById) 

// SEARCH and display 50 inventory items based on partName
router.get('/search', searchInventoryItemByPartname)


// place all the routes here for now

module.exports = router