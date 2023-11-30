const express = require('express')
const {
    createInventoryItem,
    getInventoryItem,
    getInventoryItems,
    deleteInventoryItemById,
    updateInventoryItemById,
    searchInventoryItemByPartname,
    getInventory,
    getInventoryItemById,
    getInventoryItemsForPrint,
    checkPartNameBrand,
    getDangerZoneItemCount
} = require('../controllers/inventoryItemController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// homepage - testing lang
// router.get('/', getInventoryItems)

router.get('/', getInventory)

/* INVENTORY */

// GET all inventory items
router.get('/all-items', getInventoryItems)

// GET all inventory items based on the csv format
router.get('/print-csv', getInventoryItemsForPrint)

// // GET a single item
// router.get('/:partName', getInventoryItem)   

// GET a single item using ID
router.get('/:id', getInventoryItemById)

// POST an inventory item
router.post('/add-item', createInventoryItem)

// DELETE an inventory item
router.delete('/delete-item/:id', deleteInventoryItemById) 

// UPDATE an inventory item 
router.patch('/edit-item/:id', updateInventoryItemById) 

router.post('/checkPartNameBrand', checkPartNameBrand)

router.get('/getDangerZoneItemCount', getDangerZoneItemCount)

// SEARCH and display 50 inventory items based on partName
// router.get('/search', searchInventoryItemByPartname)


// place all the routes here for now

module.exports = router