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

    getOrdersByDay: async (req, res) => {
        const { date } = req.body

        console.log('Date: ', date)

        dateTimeString = date
        const [dateOnly] = dateTimeString.split('T');


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
            }).sort({ orderDate: 1 })

            if (orders.length === 0)
                return res.status(404).json({ message: 'No orders found for this date' });

            return res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOrdersByMonth: async (req, res) => {
        const { date } = req.body;

        console.log('Date: ', date);

        dateTimeString = date;
        const [year, month] = dateTimeString.split('-');

        // console.log('Year: ', year);
        console.log('Month: ', month);

        try {
            const startDate = new Date(year, month - 1, 1);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(year, month, 0);
            endDate.setHours(23, 59, 59, 999);

            const orders = await Order.find({
                orderDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).sort({ orderDate: 1 });

            if (orders.length === 0)
                return res.status(404).json({ message: 'No orders found for this month' });

            // Aggregate orders based on the day
            const aggregatedOrders = aggregateOrdersByDay(orders);

            return res.status(200).json(aggregatedOrders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOrdersByYear: async (req, res) => {

    }
};

const aggregateOrdersByDay = (orders) => {
    const aggregatedOrders = {};

    // iterate through each order
    orders.forEach(order => {
        // create a new order date based on the order date of a single order
        const orderDate = new Date(order.orderDate).toLocaleDateString('en-US');

        // check if the orderDate exist in the object
        if (!aggregatedOrders[orderDate]) {
            aggregatedOrders[orderDate] = {
                items: [],
                totalPrice: 0,
                orderDate: new Date(order.orderDate),
                orderCount: 0
            };
        }

        // Sum up the totalPrices of each order (total cumulative revenue)
        aggregatedOrders[orderDate].totalPrice += order.totalPrice;

        // Get the total orders count for a specific day 
        aggregatedOrders[orderDate].orderCount += 1

        // Update the items array
        order.items.forEach(item => {

            // check if the item already exists
            const existingItemIndex = aggregatedOrders[orderDate].items.findIndex(existingItem =>
                existingItem.productName === item.productName
            );

            if (existingItemIndex !== -1) {
                // Update quantity if item already exists
                aggregatedOrders[orderDate].items[existingItemIndex].quantity += item.quantity
            } else {
                // Add a new item to the items array
                aggregatedOrders[orderDate].items.push({
                    productName: item.productName,
                    quantity: item.quantity
                });
            }
        });
    });

    // Convert the aggregated data into an array of objects
    const aggregatedOrdersArray = Object.values(aggregatedOrders);

    return aggregatedOrdersArray;
};

module.exports = orderController;
