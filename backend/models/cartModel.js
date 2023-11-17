const InventoryItem = require('../models/inventoryItemModel')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    inventoryItems: [
        {
            inventoryItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'InventoryItem'
            },
            quantity: {
                type: Number,
                default: 1, // Default quantity is 1
                min: [1, 'Quantity should be greater than or equal to 1'],
                max: [999, 'Quantity should be less than or equal to 999']
            }
        }
    ],
    // possible values: ['retail', 'wholesale']
    transactionType: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        require: true,
        min: [0, 'Wholesale Price Should be greater than or equal to 0'],
        max: [9999999, 'Wholesale Price should be less than or equal to 9999999']
    }
});

cartSchema.statics.findByUserId = async function (userId) {
    const cart = await this.findOne({ user: userId }).populate('inventoryItems.inventoryItem');
    return cart;
};

// Method to add an inventory item to the cart
cartSchema.methods.addItemToCart = async function (inventoryItemId) {
    // initialize the quantity
    const quantity = 1

    // Find the inventory item by ID
    const inventoryItem = await InventoryItem.findById(inventoryItemId);

    if (!inventoryItem) {
        throw new Error('Inventory item not found');
    }

    // Check if the item is already in the cart
    // use find() to find the item in the array matching the 
    const existingItem = this.inventoryItems.find(item => item.inventoryItem.equals(inventoryItem._id));

    if (existingItem) {
        // If the item is already in the cart, update the quantity
        existingItem.quantity += quantity;
    } else {
        // If the item is not in the cart, add it with the specified quantity
        this.inventoryItems.push({ inventoryItem: inventoryItem._id, quantity });
    }

    // Update the quantity based on the stock number of the inventory item
    if (existingItem && existingItem.quantity > inventoryItem.stockNumber) {
        existingItem.quantity = inventoryItem.stockNumber;
    }

    this.totalPrice = await this.calculateTotalPrice();

    // Save the cart document
    await this.save();
}

// Method to deduct an inventory item from the cart
cartSchema.methods.deductItemFromCart = async function (inventoryItemId) {
    // initialize the quantity
    const quantity = 1

    // Find the inventory item by ID
    const inventoryItem = await InventoryItem.findById(inventoryItemId);

    if (!inventoryItem) {
        throw new Error('Inventory item not found');
    }

    // Check if the item is in the cart
    const existingItem = this.inventoryItems.find(item => item.inventoryItem.equals(inventoryItem._id));

    if (existingItem) {
        // If the item is in the cart, deduct the specified quantity
        existingItem.quantity = Math.max(0, existingItem.quantity - quantity);

        // If the quantity becomes 0, remove the item from the cart
        if (existingItem.quantity === 0) {
            this.inventoryItems = this.inventoryItems.filter(item => !item.inventoryItem.equals(inventoryItem._id));
        }
    } else {
        throw new Error('Item not found in the cart');
    }

    // Save the cart document
    await this.save();
}

cartSchema.methods.confirmOrder = async function () {
    try {
        // Loop through each inventory item in the cart
        for (const cartItem of this.inventoryItems) {
            const inventoryItemId = cartItem.inventoryItem._id;
            const orderedQuantity = cartItem.quantity;

            // Find the corresponding inventory item in the database
            const inventoryItem = await InventoryItem.findById(inventoryItemId);

            if (!inventoryItem) {
                throw new Error('Inventory item not found');
            }

            // Deduct the ordered quantity from the inventory item
            inventoryItem.stockNumber = Math.max(0, inventoryItem.stockNumber - orderedQuantity);

            // Save the changes to the inventory item
            await inventoryItem.save();
        }

        // Clear the cart after confirming the order\
        // use if we don't intend to remove the document itself
        /* this.inventoryItems = [];
        await this.save(); */

        // Remove the entire cart document
        await this.model('Cart').deleteOne({ _id: this._id });
    } catch (error) {
        throw new Error(`Error confirming order: ${error.message}`);
    }
};

cartSchema.methods.cancelOrder = async function () {
    try {
        // Remove the entire cart document
        await this.model('Cart').deleteOne({ _id: this._id });
    } catch (error) {
        throw new Error(`Error canceling order: ${error.message}`);
    }
};

// Add a method to the schema for deleting items
cartSchema.methods.deleteItems = async function (itemIds) {
    try {
        // Remove the items from the inventoryItems array based on itemIds
        this.inventoryItems = this.inventoryItems.filter(item => !itemIds.includes(item._id.toString()));

        // Save the changes
        await this.save();
    } catch (error) {
        throw new Error(`Error deleting items from the cart: ${error.message}`);
    }
};

cartSchema.methods.calculateTotalPrice = async function () {
    let totalPrice = 0;

    for (const cartItem of this.inventoryItems) {
        console.log(cartItem)
        const inventoryItem = cartItem.inventoryItem;
        console.log(inventoryItem)
        const quantity = cartItem.quantity;

        console.log(inventoryItem.retailPrice)
        console.log(inventoryItem.wholesalePrice)
        
        // Determine the price based on transaction type
        const price = this.transactionType === 'retail' ? inventoryItem.retailPrice : inventoryItem.wholesalePrice;

        // Add the total price for this item to the total price of the cart
        totalPrice += price * quantity;
    }

    this.totalPrice = totalPrice; // Update the total price of the cart
};

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart