import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { DOMAIN } from '../config'
import { useState, useEffect } from 'react'
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


const SalesGraph = (props) => {
    const { user } = useAuthContext()

    const [dailySalesData, setDailySalesData] = useState([])
    const [dailyGraphData, setDailyGraphData] = useState({})

    const options = {
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
    }


// const sortedDailySalesData = dailySalesData.sort((a, b) => {
//     const timeA = a.orderDate.getHours() * 100 + a.orderDate.getMinutes() + (a.orderDate.getHours() >= 12 ? 10000 : 0);
//     const timeB = b.orderDate.getHours() * 100 + b.orderDate.getMinutes() + (b.orderDate.getHours() >= 12 ? 10000 : 0);
//     return timeA - timeB;
// });

// const labels = sortedDailySalesData.map(entry => entry.orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

// const dailySalesValues = sortedDailySalesData.map(entry => entry.totalPrice);

    const fetchData = async () => {
            try {
                const response = await fetch(DOMAIN + '/orders/date', {
                    method: "POST",
                    body: JSON.stringify({date: new Date()}), // convert to json
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json()

                const data = json.map(order => ({
                    orderDate: order.orderDate,
                    totalPrice: order.totalPrice
                }))

                console.log(data)

                setDailySalesData(data)
                
                const graphData = {
                    labels: json.map(order => new Date(order.orderDate).toLocaleDateString()),
                    datasets: [{
                        label: "Sales Today",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: json.map(order => order.totalPrice),
                    }],
                };
                

                console.log(graphData)
            
                setDailyGraphData(graphData)

                console.log('You\'ve reached this point')
                
            } catch (error) {
                console.error('Error fetching daily sales data:', error);
            }
        };

    useEffect(() => {
    

        fetchData();

        console.log('done fetching')
    }, []);

    

    const selectedPeriod = timeLabels.find(period => period.timeFrame === props.period);

    return (
        <>
            <Row>
                <Stack direction="horizontal">
                    <div className="fs-2 fw-bold">September 19, 2023</div>
                    <div className="ms-2">
                        {/* #TODO: hi @devs lagay nalang kayo ng onClick event here */}
                        <img src="icon_arrowcircleleft_.png" ></img>
                        <img src="icon_arrowcircleright_.png"></img>
                    </div>
                </Stack>
            </Row>
            <Row className="ps-4 mt-2">
                <Col>
                    <Row className="fs-5">
                        { selectedPeriod.timeFrame } Revenue
                    </Row>
                    <Row className="fs-2 fw-bold">
                        ₱ 100000.70
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. { selectedPeriod.prev }
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%   
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        Total { selectedPeriod.timeFrame } Orders
                    </Row>
                    <Row className="fs-2 fw-bold">
                        12000
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. { selectedPeriod.prev }
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%   
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                    { selectedPeriod.timeFrame } Profit
                    </Row>
                    <Row className="fs-2 fw-bold">
                        ₱ 100000.70
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. { selectedPeriod.prev }
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%   
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        Top Product { selectedPeriod.current }
                    </Row>
                    <Row>
                        <Card className="bg-finances-positive w-100 txt-white py-2">
                            <Row className="fw-bold fs-6 text-wrap mx-1">
                                Helmet Lorem Ipsum
                            </Row>
                            <Row className="mx-1">
                                50 orders { selectedPeriod.current }
                            </Row>
                        </Card>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-4">
                {dailySalesData.length > 0 ? (
        <Line data={dailyGraphData} options={options}/>
    ) : (
        <p>Loading data...</p>
    )}
            </Row>
        </>
    )
}

export default SalesGraph