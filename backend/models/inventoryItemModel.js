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
        required: true,
        default: 'Any'
    },
    stockNumber: { 
        type: Number, 
        required: true, 
        min: 0,
        max: 9999,
        validate: {
            validator: (value) => value >= 0,
            message: 'Stock number must be greater than or equal to 0',
        } 
    },
    retailPrice: {
        type: Number, 
        required: true, 
        set: (value) => parseFloat(value.toFixed(2))  // sets the limit of 2 decimal places 
    },
    stockStatus: {
        type: String,
        enum: ['In Stock', 'Out of Stock', 'Danger Zone'],
        default: 'In Stock',
        required: true,
        validate: {
            validator: () => {
                if (this.stockNumber === 0) {
                    return this.stockStatus === 'Out of Stock';
                } else if (this.stockNumber <= 5) {
                    return this.stockStatus === 'Danger Zone';
                }
                return true;
            },
            message: 'Invalid stock status based on stock number',
        }
    },
}, {
    timestamps: {
        createdAt: 'dateAdded', // Use `dateAdded` to store the created date
        updatedAt: 'dateModified' // and `dateModified` to store the last updated date
    }
})

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema)

module.exports = InventoryItem

