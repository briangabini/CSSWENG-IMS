import { Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom'
import SalesPaymentsOption from '../components/SalesPaymentsOption';
import DailyReport from '../components/DailyReport';
import MonthlyReport from '../components/MonthlyReport';
import YearlyReport from '../components/YearlyReport';

const SalesPage = () => {
    
    return (
        <>
            <Container className='main'>
                <SalesPaymentsOption />
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Daily Report</Accordion.Header>
                        <Accordion.Body>
                            {/* Daily Report Component */}
                            <DailyReport />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Monthly Report</Accordion.Header>
                        <Accordion.Body>
                            {/* Monthly Report Component */}
                            <MonthlyReport />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Yearly Report</Accordion.Header>
                        <Accordion.Body>
                            {/* Yearly Report Component */}
                            <YearlyReport />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    )
}

export default SalesPage