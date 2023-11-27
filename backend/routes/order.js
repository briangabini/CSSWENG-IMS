const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// ... [other routes] ...

// Route to get orders by day
router.post('/day', orderController.getOrdersByDay)

// Router to get orders by month
router.post('/month', orderController.getOrdersByMonth)

// Router to get orders by year
router.post('/year', orderController.getOrdersByYear)

module.exports = router;