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
        enum: ['In Stock', 'Out of Stock', 'Danger Zone'], 
        default: 'In Stock',
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'dateAdded', // Use `created_at` to store the created date
        updatedAt: 'dateModified' // and `updated_at` to store the last updated date
    }
})

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema)

module.exports = InventoryItem

