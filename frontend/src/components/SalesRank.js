import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import SalesFilter from "./SalesFilter";
import SalesQuota from "./SalesQuota";

const time = { 
    Daily: "Today",
    Monthly: "Current Month",
    Yearly: "Current Year"
}


const SalesRank = (props) => {
    return (
        <>
        <Row className="ps-3 mt-2 fs-5 fw-bold d-flex flex-row">
                <Col>
                    Sales { time[props.period] }
                </Col>
                <Col>
                    <SalesFilter />
                </Col>
                <Col>
                    { time[props.period] } Goal
                </Col>
        </Row>
        <Row>
            <Col>
                <Card className="mt-3 shadow border-0 p-4"> 
                    <Row className="ps-2 txt-gray-text">
                        <Col>
                            Date
                        </Col>
                        <Col>
                            Product Name
                        </Col>
                        <Col>
                            Price
                        </Col>
                        <Col>
                            Service Fee
                        </Col>
                        <Col>
                            QTY
                        </Col>
                    </Row>
                    <Row className="ps-2">
                        <Col>
                            Item Date
                        </Col>
                        <Col>
                            Item Product Name
                        </Col>
                        <Col>
                            Item Price
                        </Col>
                        <Col>
                            Item Service Fee
                        </Col>
                        <Col>
                            Item QTY
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col>
                <SalesQuota/>
            </Col>   
        </Row>
            
        </>
    )
}

export default SalesRank