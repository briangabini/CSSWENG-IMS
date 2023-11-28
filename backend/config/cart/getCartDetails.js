const mongoose = require('mongoose');
const Cart = require('../models/cartModel'); // Adjust the path accordingly
const User = require('../models/userModel'); // Adjust the path accordingly
const InventoryItem = require('../models/inventoryItemModel'); // Adjust the path accordingly

async function getCartDetails(cartId) {
    try {
        // Find the cart document by ID and populate the 'inventoryItems.inventoryItem' field
        const cart = await Cart.findById(cartId).populate('inventoryItems.inventoryItem');

        if (!cart) {
            throw new Error('Cart not found');
        }

        console.log('Cart details:', cart);
        // Access the populated inventory items
        const inventoryItems = cart.inventoryItems.map(item => item.inventoryItem);
        console.log('Populated Inventory Items:', inventoryItems);
    } catch (error) {
        console.error('Error fetching cart details:', error.message);
    } finally {
        // Close the Mongoose connection (optional, depending on your application structure)
        mongoose.connection.close();
    }
}

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://admin:A3PmqWnxB72Zl34Z@cssweng-ims-dev.njtywci.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


getCartDetails('6552ded4f99710483c44c9ac')