const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    userEmail: {
        type: String,
        unique: true,
        required: true,
    },

    cartItems: [{
        partName: {
            type: String,
            required: true
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
        },
        wholesalePrice: {
            type: Number,
            required: true,
            min: [0, 'Retail Price Should be greater than or equal to 0'],
            max: [9999999, 'Retail Price should be less than or equal to 9999999'],
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
        }
    }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart