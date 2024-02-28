// chartHelpers.js

import moment from 'moment';
import { DOMAIN } from '../config'

export const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};



export const getGraphLabels = (json, period) => {
    let labels = [];

    switch (period) {
        case 'Daily':
            console.log("testest0", json)
            labels = json.map(order => moment(new Date(order.orderDate)).format('hh:mm A'));
            break;
        case 'Monthly':
            labels = json.map(order => moment(new Date(order.orderDate)).format('MMM D'));
            break;
        case 'Yearly':
            labels = json.map(order => moment(new Date(order.orderDate)).format('MMMM'));
            break;
        default:
            break;
    }

    return labels;
};

export const getDate = (period, dateSelected, setDateDisplayed) => {
    switch (period) {
        case 'Daily':
            setDateDisplayed(moment(dateSelected).format('MMMM D, YYYY'));
            break;
        case 'Monthly':
            setDateDisplayed(moment(dateSelected).format('MMMM'));
            break;
        case 'Yearly':
            setDateDisplayed(moment(dateSelected).format('YYYY'));
            break;
        default:
            break;
    }
};

export const getOptions = (period, setGraphOptions) => {
    switch (period) {
        case 'Daily':
            setGraphOptions({
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        display: true,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                elements: {
                    point: {
                        radius: 3,
                    }
                },
                maintainAspectRatio: false
            });
            break;
        case 'Monthly':
        case 'Yearly':
            setGraphOptions({
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        display: true,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                elements: {
                    point: {
                        radius: 3,
                    }
                },
                maintainAspectRatio: false
            });
            break;
        default:
            break;
    }
};

export const getRevenueProfit = (salesData, setProfit, setRevenue) => {
    let value = 0;

    salesData.forEach((order) => {
        value += order.totalPrice;
    });

    value = value.toFixed(2);

    setProfit(value);
    setRevenue(value);
};

export const getTotalOrderCount = (period, salesData, setTotalOrderCount) => {
    let orderCount = 0;

    switch (period) {
        case 'Daily':
            orderCount = salesData.length;
            break;
        case 'Monthly':
        case 'Yearly':
            orderCount = 0;
            salesData.forEach(order => {
                orderCount += order.orderCount;
            });
            break;
        default:
            break;
    }

    setTotalOrderCount(orderCount);
};

export const topDailyProduct = (itemData, setTopProduct, setTopProductQuantity) => {
    // let tempProdNameList = [];
    // let tempProdQuantityList = [];
    // let tempProdPriceList = [];
    let itemsOnlyArr = [];
    for(let i = 0; i < itemData.length; i++){
        for (let j = 0; j < itemData[i].items.length; j++) {
            itemsOnlyArr.push(itemData[i].items[j])
        }
    }
    itemsOnlyArr.sort((a, b) => {
        // First, compare by quantity
        if (b.quantity !== a.quantity) {
            return b.quantity - a.quantity;
        }
    
        // If quantities are the same, then compare by product price
        return b.productPrice - a.productPrice;
    });
    setTopProduct(itemsOnlyArr[0].productName)
    setTopProductQuantity(itemsOnlyArr[0].quantity)
}

const setDateIndexBasedOnPeriod = (period, json, dateDisplayed, setDateIndex) => {

    switch (period) {
        case 'Daily':
            setDateIndex(json.indexOf(formatDate(dateDisplayed)))
            break
        case 'Monthly':
            break
        case 'Yearly':
            break
        default: 
            break
    }
}

export const getValidDates = async (period, user, setValidDates, setDateIndex, dateDisplayed) => {

    let command = ""

    // switch statement to set command
    switch (period) {

        case 'Daily':
            command = 'valid-days'
            break
        case 'Monthly':
            command = 'valid-months'
            break
        case 'Yearly': 
            command = 'valid-days'
            break
        default: 
            break
    }

    try {
        // fetch the orders from the database
        const response = await fetch(`${DOMAIN}/orders/${command}`, {
            method: "POST",
            body: JSON.stringify({ date: new Date()}), // convert to json
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        // check if the status is not OK
        if (!response.ok) {
            return
            // throw new Error(`HTTP error! status: ${response.status}`);

        }

        const json = await response.json()

        console.log('from valid dates: ', json)

        setValidDates(json)

        console.log('Done setting valid dates')

        setDateIndexBasedOnPeriod(period, json, dateDisplayed, setDateIndex)

        console.log(`Date displayed of ${period}: `, dateDisplayed )
        console.log(`printing index of ${period}: `, json.indexOf(formatDate(dateDisplayed)))


    } catch (error) {
        console.error('Error fetching valid dates:', error);
    }

    
}