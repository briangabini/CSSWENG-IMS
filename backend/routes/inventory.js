const express = require('express')
const {
    createInventoryItem,
} = require('../controllers/inventoryItemController')

const router = express.Router()

// homepage
router.get('/', (req, res) => {
    res.json({ 'mssg': 'Landing site!' })
})

/* INVENTORY */

// GET all inventory items
router.get('/all-items', getInventoryItems)

// GET a single item
router.get('/:partName', getInventoryItem)

// POST an inventory item
router.post('/add-item', createInventoryItem)

// DELETE an inventory item
router.delete('/:partName', deleteInventoryItem)

// UPDATE an inventory item
router.patch('/:partName', updateInventoryItem)

// place all the routes here for now

module.exports = router