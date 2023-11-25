import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import SalesFilter from "./SalesFilter";
import ProgressBar from 'react-bootstrap/ProgressBar'

const time = { 
    Daily: "Daily",
    Monthly: "Monthly",
    Yearly: "Yearly"
}

const now = 50

const SalesQuota = (props) => {
    return (
        <>
            <Col className="py-3">

                <Row className="ps-3 my-2 fs-5 fw-bold d-flex flex-row">
                    { time[props.period] } Goal
                </Row>
                
                <ProgressBar now={now} label={`${now}% of target reached`} />

            </Col>
        </>
    )
}

export default SalesQuota