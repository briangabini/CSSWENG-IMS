require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const inventoryRoutes = require('./routes/inventory')
const verifiedUserRoutes = require('./routes/verified-users')

// express app
const app = express()
app.use(cors(
    {
        // origin: "https://jpdgarage.vercel.app",
        origin: "http://localhost:3000",
        methods: ["POST", "GET", "PATCH", "DELETE"],
        credentials: true
    }
));

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/users', verifiedUserRoutes)
app.use('/inventory', inventoryRoutes)

// connect to the db
mongoose.connect(process.env.MONGO_URI)
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