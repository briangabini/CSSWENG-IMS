require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const InventoryItem = require('../models/inventoryItemModel');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

// Define the number of inventory items you want to create
const iterations = 200; // Change this value as needed

// Define the max limit of stock number per inventory item
const maxStockNumber = 500 // Change this value as needed

// Define the max limit of retail price per inventory item
const maxRetailPrice = 10000 // Change this value as needed

// .on(event, callback): This method is used to set up a continuous event listener. It listens for a specific event and executes the provided callback function every time that event occurs.
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// .once(event, callback) - This method is used to set up a one-time event listener. It listens for a specific event and executes the provided callback function the first time that event occurs, and then it stops listening.
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Define sample inventory items
    const sampleItems = []

    // Loop to create and insert items into the collection
    for (let i = 1; i <= iterations; i++) {
        const newItem = {
            partName: `Item ${i}`,
            brand: `Brand ${i}`,
            motorModel: `Model ${i}`,
            stockNumber: Math.floor(Math.random() * maxStockNumber),                                // Random stock number between 0 and 500
            retailPrice: parseFloat((Math.random() * maxRetailPrice).toString()).toFixed(2)         // Random retail price between 0 and 10000
        };

        if (newItem.stockNumber == 0) {
            newItem['stockStatus'] = 'Out of Stock'
        } else if (newItem.stockNumber <= 5) {
            newItem['stockStatus'] = 'Danger Zone' 
        } else {
            newItem['stockStatus'] = 'In Stock'
        }

        sampleItems.push(newItem); // Insert the new item into the collection
    }

    try {
        // Insert the sample items into the MongoDB collection
        const result = await InventoryItem.insertMany(sampleItems);
        console.log('Items inserted successfully:', result);

        // Close the database connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting items:', error);
        mongoose.connection.close();
    }
});
