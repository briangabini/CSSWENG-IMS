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

import {
    getGraphLabels,
    getDate,
    getOptions,
    getRevenueProfit,
    getTotalOrderCount,
    topDailyProduct,
    getValidDates,
    formatDate
} from '../helpers/salesGraphHelper';


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

    // store the valid dates based on dates with orders
    const [validDates, setValidDates] = useState([])

    const [dateIndex, setDateIndex] = useState()

    let [dateSelected, setDateSelected] = useState(new Date()) // choose current date by default

    const [doneLoading, setDoneLoading] = useState(false)

    const [isCalled, setIsCalled] = useState(false)

    const fetchSalesData = async (dateSelected) => {

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
                body: JSON.stringify({ date: dateSelected }), // convert to json
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            console.log('Date selected: ', dateSelected)

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

            const labels = getGraphLabels(json, period)

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

    /* const handlePrevClick = () => {
        const newIndex = dateIndex - 1;
        // console.log('Date index from useEffect: ', dateIndex)

        if (newIndex >= 0) {
            setDateIndex(prevIndex => prevIndex - 1);
            console.log('current index: ', newIndex)

            let newDate

            if (period !== 'Yearly') {

                if (!(validDates.length === 0)) {

                    switch (period) {
                        case 'Daily':
                            newDate = new Date(validDates[dateIndex]);
                            break
                        case 'Monthly':
                            newDate = getDateFromMonth(validDates[dateIndex]);
                            break
                        case 'Yearly':
                            break
                        default:
                            break
                    }


                    setDateSelected(newDate)

                }
            }
        }

    };
    
    const handleNextClick = () => {
        const newIndex = dateIndex + 1;

        // console.log('Date index from useEffect: ', dateIndex)
        if (newIndex < validDates.length) {
            setDateIndex(prevIndex => prevIndex + 1);
            console.log('current index: ', newIndex)

            let newDate

            if (period !== 'Yearly') {

                if (!(validDates.length === 0)) {

                    switch (period) {
                        case 'Daily':
                            newDate = new Date(validDates[dateIndex]);
                            break
                        case 'Monthly':
                            newDate = getDateFromMonth(validDates[dateIndex]);
                            break
                        case 'Yearly':
                            break
                        default:
                            break
                    }

                    setDateSelected(newDate)
                    
                    
                }
            }
        }
    }; */

    /* useEffect(() => {
        if (doneLoading) {
            fetchSalesData(dateSelected);

            // set the date depending on the report
            getDate(period, dateSelected, setDateDisplayed)

            console.log('Date selected: ', dateSelected)

            // set the options based on report
            getOptions(period, setGraphOptions)
        }
    }, [dateSelected]) */

    /* const getDateFromMonth = (monthName) => {
        const monthIndex = timeLabels.findIndex((label) => label.current === monthName);
        const currentYear = dateDisplayed.getFullYear();
        const newDate = new Date(currentYear, monthIndex, 1); // Assuming the day is 1st of the month
        return newDate;
    }; */


    // get the data from the database
    useEffect(() => {

        fetchSalesData(dateSelected);

        // set the date depending on the report
        getDate(period, dateSelected, setDateDisplayed)

        // set the options based on report
        getOptions(period, setGraphOptions)

        /* if (!isCalled) {
            getValidDates(period, user, setValidDates, setDateIndex, dateDisplayed)
            setIsCalled(true)
        } */


    }, []);

    // refresh when salesData has been retrieved
    useEffect(() => {

        getRevenueProfit(salesData, setProfit, setRevenue)
        getTotalOrderCount(period, salesData, setTotalOrderCount)
    }, [salesData])

    useEffect(() => {
        if (!(itemData.length === 0)) {
            topDailyProduct(itemData, setTopProduct, setTopProductQuantity)
        }
    }, [itemData, topProductName, topProductQuantity])

    /* useEffect(() => {

        let newDate

        if (period !== 'Yearly') {

            if (!(validDates.length === 0)) {
    
                switch (period) {
                    case 'Daily':
                        console.log('Date index from useEffect: ', dateIndex)
                        newDate = new Date(validDates[dateIndex]);
                        break
                    case 'Monthly':
                        newDate = getDateFromMonth(validDates[dateIndex]);
                        break
                    case 'Yearly':
                        break
                    default:
                        break
                }
    
                fetchSalesData(newDate);
    
                // set the date depending on the report
                getDate(period, dateDisplayed, setDateDisplayed)
    
                // set the options based on report
                getOptions(period, setGraphOptions)
            }
        }
    }, [dateIndex]) */

    // Update dateIndex when dateDisplayed changes
    // useEffect(() => {
    //     if (!(validDates.length === 0)) {
    //         setDateIndex(validDates.indexOf(formatDate(dateDisplayed)));
    //     }
    // }, [dateDisplayed, validDates]);


    const selectedPeriod = timeLabels.find(period => period.timeFrame === props.period);

    return (
        <>
            <Row>
                <Stack direction="horizontal">
                    {/* <div className="fs-2 fw-bold">September 19, 2023</div> */}
                    <div className="fs-2 fw-bold">{dateDisplayed.toString()}</div>

                    <div className="ms-2">
                        {/* #TODO: hi @devs lagay nalang kayo ng onClick event here */}

                        {/* BUTTON FOR GOING TO PREVIOUS DAY/MONTH/YEAR */}


                        {/* <img
                            alt="Left Click button"
                            src="icon_arrowcircleleft_.png"
                            // onClick={handlePrevClick}
                        >
                        </img> */}

                        {/* <img
                            alt="Left Click button"
                            src="icon_arrowcircleright_.png"
                            // onClick={handleNextClick}
                        >
                        </img> */}

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
                        {/* if there's loss its bg-finances-negative */}
                        {/* vs. {selectedPeriod.prev}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%
                        </div> */}
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
                        {/* if there's loss its bg-finances-negative */}
                        {/* vs. {selectedPeriod.prev}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%
                        </div> */}
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
                        {/* if there's loss its bg-finances-negative */}
                        {/* vs. {selectedPeriod.prev}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%
                        </div> */}
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