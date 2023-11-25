import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import SalesFilter from "./SalesFilter";
import ProgressBar from 'react-bootstrap/ProgressBar'

const time = { 
    Daily: "Daily",
    Monthly: "Monthly",
    Yearly: "Yearly"
}

const SalesQuota = (props) => {
    return (
        <>
            <ProgressBar className="progress-bar now={now} label={`${now}%`}">
                TESTING
            </ProgressBar>
        </>
    )
}

export default SalesQuota