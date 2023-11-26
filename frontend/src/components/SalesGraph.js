import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

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

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
        label: "My Second dataset",
        backgroundColor: "rgb(90, 90, 90)",
        borderColor: "rgb(90, 90, 90)",
        data: [0, 30, 5, 2, 70, 60, 50],
    }
  ],
};

const SalesGraph = (props) => {

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
                <Line data={data} />
            </Row>
        </>
    )
}

export default SalesGraph