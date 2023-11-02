require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const InventoryItem = require('../models/inventoryItemModel');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

// .on(event, callback): This method is used to set up a continuous event listener. It listens for a specific event and executes the provided callback function every time that event occurs.
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// .once(event, callback) - This method is used to set up a one-time event listener. It listens for a specific event and executes the provided callback function the first time that event occurs, and then it stops listening.
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Define sample inventory items
    const sampleItems = [
        {
            partName: 'Item 1',
            brand: 'Brand 1',
            motorModel: 'Model 1',
            stockNumber: 100,
            retailPrice: 3500.0,
            stockStatus: 'In Stock',
        },
        {
            partName: 'Item 2',
            brand: 'Brand 2',
            motorModel: 'Model 2',
            stockNumber: 0,
            retailPrice: 2500.0,
            stockStatus: 'Out of Stock',
        },
        {
            partName: 'Item 3',
            brand: 'Brand 3',
            motorModel: 'Model 3',
            stockNumber: 240,
            retailPrice: 1000.0,
            stockStatus: 'In Stock',
        },
        {
            partName: 'Item 4',
            brand: 'Brand 4',
            motorModel: 'Model 4',
            stockNumber: 120,
            retailPrice: 500.0,
            stockStatus: 'In Stock',
        },
        {
            partName: 'Item 5',
            brand: 'Brand 5',
            motorModel: 'Model 5',
            stockNumber: 0,
            retailPrice: 750.0,
            stockStatus: 'Out of Stock',
        },
        {
            partName: 'Item 6',
            brand: 'Brand 6',
            motorModel: 'Model 6',
            stockNumber: 180,
            retailPrice: 200.0,
            stockStatus: 'In Stock',
        },
        {
            partName: 'Item 7',
            brand: 'Brand 7',
            motorModel: 'Model 7',
            stockNumber: 0,
            retailPrice: 300.0,
            stockStatus: 'Out of Stock',
        },
        {
            partName: 'Item 8',
            brand: 'Brand 8',
            motorModel: 'Model 8',
            stockNumber: 200,
            retailPrice: 400.0,
            stockStatus: 'In Stock',
        },
        {
            partName: 'Item 9',
            brand: 'Brand 9',
            motorModel: 'Model 9',
            stockNumber: 65,
            retailPrice: 150.0,
            stockStatus: 'In Stock',
        },
        {
            partName: 'Item 10',
            brand: 'Brand 10',
            motorModel: 'Model 10',
            stockNumber: 5,
            retailPrice: 5000.0,
            stockStatus: 'Danger Zone',
        },
    ];

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
