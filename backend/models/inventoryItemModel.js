const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventoryItemSchema = new Schema({
    partName: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true,
    },
    motorModel: {
        type: String,
        required: true,
        default: 'Any'
    },
    stockNumber: { 
        type: Number, 
        required: true, 
        min: [0, 'Stock Number should be greater than or equal to 0'],
        max: [9999999, 'Stock Number should be less than or equal to 9999999'],
        /* validate: {
            validator: (value) => value >= 0,
            message: 'Stock number must be greater than or equal to 0',
        }  */
    },
    retailPrice: {
        type: Number, 
        required: true, 
        min: [0, 'Retail Price Should be greater than or equal to 0'],
        max: [9999999, 'Retail Price should be less than or equal to 9999999'],
    },
    stockStatus: {
        type: String,
        enum: ['In Stock', 'Out of Stock', 'Danger Zone'],
        default: 'In Stock',
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'dateAdded', // Use `dateAdded` to store the created date
        updatedAt: 'dateModified' // and `dateModified` to store the last updated date
    }
})

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema)

module.exports = InventoryItem

