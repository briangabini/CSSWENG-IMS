const InventoryItem = require('../models/inventoryItemModel')
const mongoose = require('mongoose')

// get all inventory items based on filter
// we can use using the .sort(), and filter using specific .find() queries

// get all inventory items based on search
// use .find() + regex(?)

// get all inventory items 
const getInventoryItems = async (req, res) => {
    const inventoryItems = await InventoryItem.find({}) // returns javascript object
    // if we want to sort const inventoryItems = await InventoryItem.find({}).sort({createdAt: })

    res.status(200).json(inventoryItems) // sends JSON response to the client
}

// get a single inventory item using part name
const getInventoryItem = async (req, res) => {
    const { partName } = req.params

    const inventoryItem = await InventoryItem.findOne({ partName: partName })

    if (!inventoryItem) {
        return res.status(404).json({ error: 'No such inventory item is found!' })
    }

    res.status(200).json(inventoryItem)

}

// get a single inventory item using id
const getInventoryItemById = async (req, res) => {
    const { id } = req.params

    const inventoryItem = await InventoryItem.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such inventory item is found!' })
    }

    if (!inventoryItem) {
        return res.status(404).json({error: 'No such inventory item is found!'})
    }

    res.status(200).json(inventoryItem)

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

// delete in inventory item
const deleteInventoryItemById = async(req, res) => {
    const id = req.params.id 

    // checks if the id variable is in type ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such inventory item is found!' })
    }
    
    try {

        const inventoryItem = await InventoryItem.findByIdAndDelete(id)
        res.status(200).json(inventoryItem)

    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
}

// edit in inventory item
const updateInventoryItemById = async(req, res) => {
    const id = req.params.id 

    // checks if the id variable is in type ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such inventory item is found!' })
    }
    
    try {
        const inventoryItem = await InventoryItem.findByIdAndUpdate(id, req.body)
        res.status(200).json(inventoryItem)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getInventoryItem,
    getInventoryItems,
    createInventoryItem,
    deleteInventoryItemById,
    updateInventoryItemById
}