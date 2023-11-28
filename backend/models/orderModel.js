const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    items: [
        {
            productName: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    transactionType: {
        type: String,
        required: true,
        // possible values: ['retail', 'wholesale']
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order