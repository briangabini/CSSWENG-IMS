const express = require('express')
const InventoryItem = require('../models/inventoryItemModel')

const router = express.Router()

// homepage
router.get('/', (req, res) => {
    res.json({ 'mssg': 'Landing site!' })
})

/* INVENTORY CRUD OPERATIONS */
// adding items
router.post('/add-items', async (req, res) => {
    const { partName, brand, motorModel, stockNumber, retailPrice } = req.body

    try {

        const inventoryItem = await InventoryItem.create({ partName, brand, motorModel, stockNumber, retailPrice })
        res.status(200).json(inventoryItem)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }


    res.json({ 'mssg': 'Adding inventory items' })
})

// deleting items

// updating items 

// place all the routes here for now

module.exports = router