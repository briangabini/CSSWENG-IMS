require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Order = require('../../models/orderModel');

const moment = require('moment');

const START_DATE = moment('2023-11-01')
const END_DATE = moment('2023-12-30')

const generateRandomItem = () => {
    const randomQuantity = Math.floor(Math.random() * 10) + 1;
    const randomPrice = (Math.random() * (4000 - 50) + 50).toFixed(2);

    return {
        "productName": `Item ${Math.floor(Math.random() * 10000)}`,
        
        "quantity": randomQuantity,
    };
};

const generateRandomDate = () => {
    const startDate = START_DATE
    const endDate = END_DATE
    const randomDate = moment(startDate + Math.random() * (endDate - startDate));
    return randomDate.toISOString();
};

const sampleItems = Array.from({ length: 20 }, () => {
    const items = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, generateRandomItem);
    const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
    const transactionType = Math.random() > 0.5 ? "retail" : "wholesale";
    const orderDate = generateRandomDate();

    return {
        items,
        totalPrice,
        transactionType,
        orderDate,
    };
});

mongoose.connect(process.env.MONGO_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
        const result = await Order.insertMany(sampleItems);
        console.log('Orders inserted successfully:', result);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting orders:', error);
        mongoose.connection.close();
    }
});
