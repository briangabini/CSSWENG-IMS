import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

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

const DailyReport = () => {
    return (
        <>
            <Row>
                <Stack direction="horizontal">
                    <div className="fs-2 fw-bold">September 19, 2023</div>
                    <div className="ms-2">
                        <img src="icon_arrowcircleleft_.png"></img>
                        <img src="icon_arrowcircleright_.png"></img>
                    </div>
                </Stack>
            </Row>
            <Row className="ps-4 mt-2">
                <Col>
                    <Row className="fs-5">
                        Daily Revenue
                    </Row>
                    <Row className="fs-2 fw-bold">
                        ₱ 100000.70
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. yesterday
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%   
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        Total Daily Orders
                    </Row>
                    <Row className="fs-2 fw-bold">
                        12000
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. yesterday
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%   
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        Daily Profit
                    </Row>
                    <Row className="fs-2 fw-bold">
                        ₱ 100000.70
                    </Row>
                    <Row className="d-flex flex-row">
                        vs. yesterday
                        {/* if there's loss its bg-finances-negative */}
                        <div className="rounded-pill border ms-2 px-3 w-auto txt-white bg-finances-positive">
                            +25%   
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="fs-5">
                        Top Product Today
                    </Row>
                    <Row>
                        <Card className="bg-finances-positive w-100 txt-white py-2">
                            <Row className="fw-bold fs-6 text-wrap mx-1">
                                Helmet Lorem Ipsum
                            </Row>
                            <Row className="mx-1">
                                50 orders today
                            </Row>
                        </Card>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-4">
                <Line data={data} />
            </Row>
            <Row className="ps-3 mt-2 fs-5 fw-bold">
                Sales Today
            </Row>
            <Row>
                
            </Row>
        </>
    )
}

export default DailyReport