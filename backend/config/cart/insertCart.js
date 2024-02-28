const mongoose = require('mongoose');
const Cart = require('../models/cartModel'); // Adjust the path accordingly
const User = require('../models/userModel'); // Adjust the path accordingly
const InventoryItem = require('../models/inventoryItemModel'); // Adjust the path accordingly

async function addDocumentToCart() {
    try {
        // Find a user to associate with the cart (replace 'USER_ID' with an actual user ID)
        const user = await User.findById('654af7227ea178170b36ad78');
        if (!user) {
            throw new Error('User not found');
        }

        // Find inventory items to add to the cart
        const itemData = [
            {
                partName: 'Item 1',
                brand: 'Brand 1',
                inventoryItemId: '655089395b805b1f00f9760a',
                quantity: 2,
            },
            {
                partName: 'Item 2',
                brand: 'Brand 2',
                inventoryItemId: '655089395b805b1f00f9760b',
                quantity: 2,
            },
            {
                partName: 'Item 3',
                brand: 'Brand 3',
                inventoryItemId: '655089395b805b1f00f9760c',
                quantity: 2,
            },
            {
                partName: 'Item 4',
                brand: 'Brand 4',
                inventoryItemId: '655089395b805b1f00f9760d',
                quantity: 2,
            },
            {
                partName: 'Item 5',
                brand: 'Brand 5',
                inventoryItemId: '655089395b805b1f00f9760e',
                quantity: 2,
            },
        ];

        const inventoryItems = await Promise.all(
            itemData.map(async (item) => {
                const inventoryItem = await InventoryItem.findById(item.inventoryItemId);
                if (!inventoryItem) {
                    throw new Error(`Inventory item ${item.inventoryItemId} not found`);
                }

                return {
                    inventoryItem: inventoryItem._id,
                    quantity: item.quantity,
                };
            })
        );

        // Create a cart document with the inventory items
        const cartDocument = new Cart({
            user: user._id,
            inventoryItems,
            transactionType: 'Retail', // Replace with the desired transaction type
        });

        // Save the cart document
        const savedCart = await cartDocument.save();

        console.log('Cart document added successfully:', savedCart);
    } catch (error) {
        console.error('Error adding cart document:', error.message);
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

// Call the function to add a document to the Cart collection
addDocumentToCart();
