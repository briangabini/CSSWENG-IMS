const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    inventoryItems: [
        {
            inventoryItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'InventoryItem'
            }
        }
    ], 
    transactionType: {
        type: String,
        required: true
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart