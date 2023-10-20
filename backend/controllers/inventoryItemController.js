const InventoryItem = require('../models/inventoryItemModel')

// get all inventory items based on filter
// we can use using the .sort(), and filter using specific .find() queries

// get all inventory items based on search
// use .find() + regex(?)

// get a single inventory item


// get all inventory items
const getInventoryItems = async (req, res) => {
    const inventoryItems = await InventoryItem.find({})
    // if we want to sort const inventoryItems = await InventoryItem.find({}).sort({createdAt: })

    res.status(200).json(inventoryItems)
}

// create new inventory item
const createInventoryItem = async (req, res) => {
    const { partName, brand, motorModel, stockNumber, retailPrice } = req.body

    // add doc to db
    try {

        const inventoryItem = await InventoryItem.create({ partName, brand, motorModel, stockNumber, retailPrice })
        res.status(200).json(inventoryItem)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createInventoryItem
}