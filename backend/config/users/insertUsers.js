require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const User = require('../../models/userModel');

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

    // Define sample user data
    const sampleUsers = [
        {
            email: 'brian@gmail.com',
            password: 'password1',
            employeeName: 'Brian',
            role: 'Partsman',
        },
        {
            email: 'carl@gmail.com',
            password: 'password2',
            employeeName: 'Carl',
            role: 'Cashier',
        },
        {
            email: 'gab@gmail.com',
            password: 'password3',
            employeeName: 'Gab',
            role: 'Secretary',
        },
        {
            email: 'justin@gmail.com',
            password: 'password4',
            employeeName: 'Justin',
            role: 'Admin',
        },
        {
            email: 'leeroi@gmail.com',
            password: 'password5',
            employeeName: 'Leeroi',
            role: 'Partsman',
        },
    ];

    try {
        // Insert the sample users into the MongoDB collection
        const result = await User.insertMany(sampleUsers);
        console.log('Users inserted successfully:', result);

        // Close the database connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting users:', error);
        mongoose.connection.close();
    }
});