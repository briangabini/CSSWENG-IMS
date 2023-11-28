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

        // console.log('Date: ', date)

        dateTimeString = date
        const [dateOnly] = dateTimeString.split('T');


        // console.log('I want mommy date: ', dateOnly)

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

        // console.log('Date: ', date);

        dateTimeString = date;
        const [year, month] = dateTimeString.split('-');

        // console.log('Year: ', year);
        // console.log('Month: ', month);

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

            // console.log(orders)


            // Aggregate orders based on the day
            const aggregatedOrders = aggregateOrdersByDay(orders);

            return res.status(200).json(aggregatedOrders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOrdersByYear: async (req, res) => {
        const { date } = req.body;

        // console.log('Date: ', date);

        dateTimeString = date;
        const [year] = dateTimeString.split('-');

        try {
            const startDate = new Date(year, 0, 1);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

            const orders = await Order.find({
                orderDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).sort({ orderDate: 1 });

            if (orders.length === 0)
                return res.status(404).json({ message: 'No orders found for this year' });

            // Aggregate orders based on the month
            const aggregatedOrders = aggregateOrdersByMonth(orders);

            return res.status(200).json(aggregatedOrders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getValidDaysByMonth: async (req, res) => {
        const { date } = req.body;

        // console.log('Date: ', date);

        try {
            const [year, month] = date.split('-');

            const startDate = new Date(year, month - 1, 1);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(year, month, 0);
            endDate.setHours(23, 59, 59, 999);

            const orders = await Order.find({
                orderDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            if (orders.length === 0)
                return res.status(404).json({ message: 'No orders found for this month' });

            // Extract unique days from the orders
            const uniqueDays = [...new Set(orders.map(order => new Date(order.orderDate).toLocaleDateString('en-US')))];

            // Sort the uniqueDays array
            const sortedDays = uniqueDays.sort((a, b) => new Date(a) - new Date(b));

            return res.status(200).json(sortedDays);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getValidMonthsByYear: async (req, res) => {
        const { date } = req.body;

        // console.log('Date: ', date);

        try {
            const startDate = new Date(date);
            startDate.setMonth(0, 1);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setMonth(11, 31);
            endDate.setHours(23, 59, 59, 999);

            const orders = await Order.find({
                orderDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            if (orders.length === 0)
                return res.status(404).json({ message: 'No orders found for this year' });

            // Extract unique months from the orders without the year
            const uniqueMonths = [...new Set(orders.map(order =>
                new Date(order.orderDate).toLocaleDateString('en-US', { month: 'long' })
            ))];

            // Sort the uniqueMonths array based on the actual order of the months
            const sortedMonths = sortMonths(uniqueMonths);

            return res.status(200).json(sortedMonths);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

/* HELPER FUNCTIONS */
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

            // check if the item doesn't exist
            if (existingItemIndex !== -1) {
                // Update quantity if item already exists
                aggregatedOrders[orderDate].items[existingItemIndex].quantity += item.quantity
            } else {
                // Add a new item to the items array
                aggregatedOrders[orderDate].items.push({
                    productName: item.productName,
                    productPrice: item.productPrice,
                    quantity: item.quantity
                });
            }
        });
    });

    // Convert the aggregated data into an array of objects
    const aggregatedOrdersArray = Object.values(aggregatedOrders);

    return aggregatedOrdersArray;
};

const aggregateOrdersByMonth = (orders) => {
    const aggregatedOrders = {};

    // iterate through each order
    orders.forEach(order => {
        // create a new order date based on the month and year of a single order
        const orderMonth = new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

        // check if the orderMonth exists in the object
        if (!aggregatedOrders[orderMonth]) {
            aggregatedOrders[orderMonth] = {
                items: [],
                totalPrice: 0,
                orderDate: new Date(order.orderDate),
                orderCount: 0
            };
        }

        // Sum up the totalPrices of each order (total cumulative revenue)
        aggregatedOrders[orderMonth].totalPrice += order.totalPrice;

        // Get the total orders count for a specific month 
        aggregatedOrders[orderMonth].orderCount += 1

        // Update the items array
        order.items.forEach(item => {

            // check if the item already exists
            const existingItemIndex = aggregatedOrders[orderMonth].items.findIndex(existingItem =>
                existingItem.productName === item.productName
            );

            if (existingItemIndex !== -1) {
                // Update quantity if item already exists
                aggregatedOrders[orderMonth].items[existingItemIndex].quantity += item.quantity
            } else {
                // Add a new item to the items array
                aggregatedOrders[orderMonth].items.push({
                    productName: item.productName,
                    productPrice: item.productPrice,
                    quantity: item.quantity
                });
            }
        });
    });

    // Convert the aggregated data into an array of objects
    const aggregatedOrdersArray = Object.values(aggregatedOrders);

    return aggregatedOrdersArray;
};

const sortMonths = (months) => {
    const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return months.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
};


module.exports = orderController;
