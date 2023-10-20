const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventoryItemSchema = new Schema({
    partName: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    motorModel: {
        type: String,
        required: true
    }, 
    stockNumber: {
        type: Number,
        required: true,
    },
    retailPrice: {
        type: Number,
        required: true,
    },
    stockStatus: {
        type: String,
        enum: ['In Stock', 'Out of Stock', 'Low Stock'], 
        default: 'In Stock',
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
})

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema)

module.exports = InventoryItem

