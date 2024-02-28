require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const inventoryRoutes = require('./routes/inventory')
const verifiedUserRoutes = require('./routes/verified-users')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')


// express app
const app = express()
app.use(cors({
    // origin: "*",
    origin: 'https://jpdgarage.vercel.app',
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
    credentials: true
}));

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/users', verifiedUserRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)

let MONGO_URI = ""

// const temp = "production"

// if (temp === "production") {
    // MONGO_URI = process.env.MONGO_URI
// } else {
    // MONGO_URI = process.env.MONGO_URI_DEV
// }

MONGO_URI = 'mongodb+srv://brian_gabini:JJp5gWZc0gNLPfcT@cssweng-ims.3qrhrzm.mongodb.net/?retryWrites=true&w=majority'

// connect to the db
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    }) 