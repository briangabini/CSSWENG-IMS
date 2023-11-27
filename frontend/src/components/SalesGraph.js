/* IMPORTS */
import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import Chart from "chart.js/auto";
import { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import moment, { max } from 'moment'

// local imports
import { DOMAIN } from '../config'
import { useAuthContext } from "../hooks/useAuthContext"


const timeLabels = [
    {
        timeFrame: 'Daily',
        current: 'Today',
        prev: 'Yesterday',
    },
    {
        timeFrame: 'Monthly',
        current: 'This Month',
        prev: 'Last Month',
    },
    {
        timeFrame: 'Yearly',
        current: 'This Year',
        prev: 'Last Year',
    },
];

const SalesGraph = (props) => {
    // user data for authentication
    const { user } = useAuthContext()

    // sales data to be used with the graph
    const [salesData, setSalesData] = useState([])
    // graph data for displaying the chart
    const [graphData, setGraphData] = useState({})
    // date to be displayed depending on the sales 
    const [dateDisplayed, setDateDisplayed] = useState(new Date())

    // the current timeperiod
    const [period, setPeriod] = useState(props.period)

    // set the options 
    const [graphOptions, setGraphOptions] = useState()

    // set the revenue and profit
    const [revenue, setRevenue] = useState(0)
    const [profit, setProfit] = useState(0)

    const [totalOrderCount, setTotalOrderCount] = useState(0)

    // set the top product ordered
    const [topProductName, setTopProduct] = useState('')
    const [topProductQuantity, setTopProductQuantity] = useState(0)
    const [itemData, setItemData] = useState([])

    const fetchSalesData = async () => {

        let localPeriod = ""

        switch (period) {
            case 'Daily':
                localPeriod = 'day'
                break
            case 'Monthly':
                localPeriod = 'month'
                break
            case 'Yearly':
                localPeriod = 'year'
                break
            default:
                break
        }

        try {
            // fetch the orders from the database
            const response = await fetch(`${DOMAIN}/orders/${localPeriod}`, {
                method: "POST",
                body: JSON.stringify({ date: new Date() }), // convert to json
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            // check if the status is not OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // deserialize json to js object
            const json = await response.json()

            console.log("json", json)
            setItemData(json)

            // map json to get the data for the graph
            const data = json.map(order => ({
                orderDate: order.orderDate,
                totalPrice: order.totalPrice,
                orderCount: order.orderCount !== null ? order.orderCount : 0
            }))

            // DEBUG
            console.log("data", data)

            // set sales data 
            setSalesData(data)

            const labels = getGraphLabels(json)

            // graph data
            const graphData = {
                labels: labels,
                datasets: [{
                    label: "Sales Today",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: json.map(order => order.totalPrice),
                }],
            };

            console.log(graphData)

            setGraphData(graphData)

            console.log('You\'ve reached this point')

        } catch (error) {
            console.error('Error fetching daily sales data:', error);
        }
    };

    // TODO: implement the fetching of the monthly sales

    // TODO: implement the fetching of the yearly sales

    const getGraphLabels = (json) => {
        let labels = []

        switch (period) {

            case 'Daily':
                labels = json.map(order => moment(new Date(order.orderDate)).format('hh:mm A'))

                break
            case 'Monthly':
                labels = json.map(order => moment(new Date(order.orderDate)).format('MMM D'))
                break
            case 'Yearly':
                labels = json.map(order => moment(new Date(order.orderDate)).format('hh:mm A'))
                break
            default:
                break
        }

        return labels
    }

    const getDate = () => {
        switch (period) {
            case 'Daily':
                setDateDisplayed(moment(dateDisplayed).format('MMMM D, YYYY'))
                break
            case 'Monthly':
                setDateDisplayed(moment(dateDisplayed).format('MMMM'))
                break
            case 'Yearly':
                setDateDisplayed(moment(dateDisplayed).format('YYYY'))
                break
            default:
                break
        }
    }

    // TODO: do this function
    const getOption = () => {

        switch (period) {
            case 'Daily':
                setGraphOptions({
                    scales: {
                        x: {
                            display: false, // Hides the x-axis labels
                        },
                        y: {
                            display: true, // Hides the y-axis labels
                        }
                    },
                    plugins: {
                        legend: {
                            display: false, // Hides the legend (if you also want to hide it)
                        }
                    },
                    elements: {
                        point: {
                            radius: 3 // Adjust the radius of the points on the line
                        }
                    },
                    maintainAspectRatio: false // Optional, if you want a responsive chart
                })

                break
            case 'Monthly':
                setGraphOptions({
                    scales: {
                        x: {
                            display: true, // Hides the x-axis labels
                        },
                        y: {
                            display: true, // Hides the y-axis labels
                        }
                    },
                    plugins: {
                        legend: {
                            display: false, // Hides the legend (if you also want to hide it)
                        }
                    },
                    elements: {
                        point: {
                            radius: 3 // Adjust the radius of the points on the line
                        }
                    },
                    maintainAspectRatio: false // Optional, if you want a responsive chart
                })

                break
            case 'Yearly':
                setGraphOptions({
                    scales: {
                        x: {
                            display: true, // Hides the x-axis labels
                        },
                        y: {
                            display: true, // Hides the y-axis labels
                        }
                    },
                    plugins: {
                        legend: {
                            display: false, // Hides the legend (if you also want to hide it)
                        }
                    },
                    elements: {
                        point: {
                            radius: 3 // Adjust the radius of the points on the line
                        }
                    },
                    maintainAspectRatio: false // Optional, if you want a responsive chart
                })
                break
            default:
                break
        }
    }

    const getRevenueProfit = () => {
        // store the sum of all order profits
        let value = 0

        salesData.forEach((order) => {
            value += order.totalPrice
            console.log(order.totalPrice)
        })

        value = value.toFixed(2)

        setProfit(value)
        setRevenue(value)

    }

    const getTotalOrderCount = () => {
        let orderCount = 0

        switch (period) {
            case 'Daily':

                orderCount = salesData.length

                break
            case 'Monthly':
                orderCount = 0

                salesData.forEach(order => {
                    orderCount += order.orderCount
                })

                break
            default:
                break
        }
        setTotalOrderCount(orderCount)
    }

    const topDailyProduct = () => {
        //salesData
        // const [topProductName, setTopProduct] = useState('')
        // const [topProductQuantity, setTopProductQuantity] = useState(0)
        let tempProdNameList = []
        let tempProdQuantityList = []
        for(let i = 1; i < itemData.length; i++){
            tempProdNameList.push(itemData[i].items[0].productName)
            tempProdQuantityList.push(itemData[i].items[0].quantity)
        }

        setTopProductQuantity(Math.max(...tempProdQuantityList))
        let indexQuantity = tempProdQuantityList.indexOf(topProductQuantity)
        let prodMaxName = tempProdNameList[indexQuantity]
        setTopProduct(prodMaxName)
    }

    // get the data from the database
    useEffect(() => {

        fetchSalesData();

        // set the date depending on the report
        getDate()

        // set the options based on report
        getOption()

        console.log('done fetching')
    }, []);

    // refresh when salesData has been retrieved
    useEffect(() => {
        getRevenueProfit()
        getTotalOrderCount()
    }, [salesData])

    useEffect(() =>{
        if(!(itemData.length === 0)){
            topDailyProduct()
        }
    }, [itemData, topProductName, topProductQuantity])


    const selectedPeriod = timeLabels.find(period => period.timeFrame === props.period);

    return (
        <>
            <Row>
                <Stack direction="horizontal">
                    {/* <div className="fs-2 fw-bold">September 19, 2023</div> */}
                    <div className="fs-2 fw-bold">{dateDisplayed.toString()}</div>

                    <div className="ms-2">
                        {/* #TODO: hi @devs lagay nalang kayo ng onClick event here */}

                        {/* <img src="icon_arrowcircleleft_.png" ></img> */}
                        {/* <img src="icon_arrowcircleright_.png"></img> */}
                    </div>
                </Stack>
            </Row>
            <Row className="ps-4 mt-2">
                <Col>
                    <Row className="fs-5">
                        {selectedPeriod.timeFrame} Revenue
                    </Row>
                    <Row className="fs-4 fw-bold">
                        ₱ {revenue}
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. {selectedPeriod.prev}
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        Total {selectedPeriod.timeFrame} Orders
                    </Row>
                    <Row className="fs-4 fw-bold">
                        {totalOrderCount}
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. {selectedPeriod.prev}
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        {selectedPeriod.timeFrame} Profit
                    </Row>
                    <Row className="fs-4 fw-bold">
                        ₱ {profit}
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. {selectedPeriod.prev}
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        Top Product {selectedPeriod.current}
                    </Row>
                    <Row>
                        <Card className="bg-finances-positive w-100 txt-white py-2">
                            <Row className="fw-bold fs-6 text-wrap mx-1">
                                {topProductName}
                            </Row>
                            <Row className="mx-1">
                                {topProductQuantity} orders {selectedPeriod.current}
                            </Row>
                        </Card>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-4">
                {salesData.length > 0 ? (

                    <Line data={graphData} options={graphOptions} />
                ) : (
                    <p>Loading data...</p>
                )}
            </Row>
        </>
    )
}

export default SalesGraph

// const sortedDailySalesData = dailySalesData.sort((a, b) => {
//     const timeA = a.orderDate.getHours() * 100 + a.orderDate.getMinutes() + (a.orderDate.getHours() >= 12 ? 10000 : 0);
//     const timeB = b.orderDate.getHours() * 100 + b.orderDate.getMinutes() + (b.orderDate.getHours() >= 12 ? 10000 : 0);
//     return timeA - timeB;
// });

// const labels = sortedDailySalesData.map(entry => entry.orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

// const dailySalesValues = sortedDailySalesData.map(entry => entry.totalPrice);

//   const dailySalesData = [
//     {
//         totalPrice: 150.25,
//         orderDate: new Date('2023-09-19T08:30:00Z'), // Adjust the date and time as needed
//     },
//     {
//         totalPrice: 75.5,
//         orderDate: new Date('2023-09-19T12:15:00Z'),
//     },
//     {
//         totalPrice: 200,
//         orderDate: new Date('2023-09-19T16:45:00Z'),
//     },
//     {
//         totalPrice: 120.75,
//         orderDate: new Date('2023-09-19T09:30:00Z'),
//     },
//     {
//         totalPrice: 90.0,
//         orderDate: new Date('2023-09-19T14:00:00Z'),
//     },
//     {
//         totalPrice: 180.50,
//         orderDate: new Date('2023-09-19T18:30:00Z'),
//     },
//     {
//         totalPrice: 100.25,
//         orderDate: new Date('2023-09-19T10:45:00Z'),
//     },
//     {
//         totalPrice: 50.75,
//         orderDate: new Date('2023-09-19T13:30:00Z'),
//     },
//     {
//         totalPrice: 220.0,
//         orderDate: new Date('2023-09-19T17:15:00Z'),
//     },
//     {
//         totalPrice: 80.50,
//         orderDate: new Date('2023-09-19T11:00:00Z'),
//     },
//     {
//         totalPrice: 160.25,
//         orderDate: new Date('2023-09-19T15:45:00Z'),
//     },
//     {
//         totalPrice: 220.0,
//         orderDate: new Date('2023-09-19T17:15:00Z'),
//     },
//     {
//         totalPrice: 80.50,
//         orderDate: new Date('2023-09-19T11:00:00Z'),
//     },
//     {
//         totalPrice: 160.25,
//         orderDate: new Date('2023-09-19T15:45:00Z'),
//     },
//     {
//         totalPrice: 220.0,
//         orderDate: new Date('2023-09-19T17:15:00Z'),
//     },
//     {
//         totalPrice: 80.50,
//         orderDate: new Date('2023-09-19T11:00:00Z'),
//     },
//     {
//         totalPrice: 160.25,
//         orderDate: new Date('2023-09-19T15:45:00Z'),
//     },
//     {
//         totalPrice: 220.0,
//         orderDate: new Date('2023-09-19T17:15:00Z'),
//     },
//     {
//         totalPrice: 80.50,
//         orderDate: new Date('2023-09-19T11:00:00Z'),
//     },
//     {
//         totalPrice: 160.25,
//         orderDate: new Date('2023-09-19T15:45:00Z'),
//     },
//     ];