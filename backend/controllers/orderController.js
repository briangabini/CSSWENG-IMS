const Order = require('../models/orderModel'); // Replace with the actual path to your Order model
const orderController = {

    // Get all orders
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrdersByDate: async (req, res) => {
        const {date} = req.body

        console.log('Date: ', date)

        dateTimeString = date
        const [dateOnly, time] = dateTimeString.split('T');


        console.log('I want mommy date: ', dateOnly)

        try {
            // const { date } = req.params; // assuming date is passed as a URL parameter
            const startDate = new Date(dateOnly);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(dateOnly);
            endDate.setHours(23, 59, 59, 999);

            const orders = await Order.find({
                orderDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            if (orders.length === 0) 
                return res.status(404).json({ message: 'No orders found for this date' });

            return res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = orderController;
