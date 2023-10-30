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
        const updatedData = req.body; // Data to update, including stockNumber and stockStatus

        // Check if the updated stockNumber is 0, and if so, set stockStatus to 'Out of Stock'
        if (updatedData.stockNumber === 0) {
            updatedData.stockStatus = 'Out of Stock'
        } else if (updatedData.stockNumber <= 5) {
            updatedData.stockStatus = 'Danger Zone'
        } else {
            updatedData.stockStatus = 'In Stock' 
        }

        // Find and update the document
        const inventoryItem = await InventoryItem.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found!' });
        }

        res.status(200).json(inventoryItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchInventoryItemByPartname = async (req, res) => {
    try {
        // filters to apply 

        const search = req.query.search || "";
        const inventoryItems = await InventoryItem.find({
            partName: { $regex: search, $options: "i" }
        });

        
        res.status(200).json(inventoryItems);
    } catch (err) {
        console.log(err);
        // res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

const getInventory = async (req, res) => {
    // filters to implement
    /*
        - partName asc, desc
        - retailPrice asc, desc
        - stockNumber asc, desc
        - dateAdded asc, desc
        - dateModified asc, desc
        - stockStatus: 'In Stock', 'Out of Stock', 'Danger Zone'
        - 
    */

    try {
        const page = parseInt(req.query.page) - 1 || 0       // default: first page 
        const limit = parseInt(req.query.limit) || 5         // for testing only, we are able to change the limit of items in a page
        const search = req.query.search || ""                // default: no search query
        const motorModel = req.query.motorModel || ""
        let sort = req.query.sort || "partName"              // default: sort by part name ascending
        let stockStatus = req.query.stockStatus || "All"

        const stockStatusOptions = [
            'In Stock',
            'Out of Stock',
            'Danger Zone'
        ]

        stockStatus === "All" 
        ? (stockStatus = [...stockStatusOptions])
        : (stockStatus = req.query.stockStatus.split(','))

        req.query.sort 
        ? (sort = req.query.sort.split(','))
        : (sort = [sort])

        let sortBy = {};
        // if sort array is greater than 1, then there's a specific order in sorting
        if (sort[1]) {
            sortBy[sort[0]] = sort[1] // create a new property on sortBy with the value of "sort[0]" and if it's asc or desc based on "sort[1]"
        } else {
            sortBy[sort[0]] = "asc" // default: asc order e.g. A-Z
        }

        const items = await InventoryItem.find({partName: {$regex: search, $options: "i"}, motorModel: {$regex: motorModel, $options: "i"}})
            .where('stockStatus')
            .in([...stockStatus])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit)

        const total = await InventoryItem.countDocuments({
            stockStatus: {$in: [...stockStatus]},
            partName: {$regex: search, $options: "i"}
        })

        const response = {
            error: false,
            total,
            page: page + 1,
            limit, 
            stockStatus: stockStatusOptions,
            items
        }

        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({error: true, message: "Internal Server Error"})
    }

}

module.exports = {
    getInventoryItem,
    getInventoryItems,
    createInventoryItem,
    deleteInventoryItemById,
    updateInventoryItemById,
    searchInventoryItemByPartname,
    getInventory,
    getInventoryItemById
}