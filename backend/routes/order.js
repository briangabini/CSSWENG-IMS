const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// ... [other routes] ...

// Route to get orders by date
router.post('/date', orderController.getOrdersByDate);

module.exports = router;