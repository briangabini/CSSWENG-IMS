// bootstrap
import {Container, Row, Col, Card, Dropdown, DropdownButton, Button, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ReminderAndStatistics from '../components/ReminderAndStatistics'

const Dashboard = () => {

    const navigate = useNavigate();

    const navigateSales = () => {
        navigate(`/sales-page`);
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    }
    return (
       

        <Container className='main'>
            <Row className='fs-2 fw-bold col-12'>
                Good day, Justin Depano.
            </Row>

            <Row className='pe-2'>
                <Col className='col-8'>
                    <Row className='fw-bold txt-20 my-2'>
                        Revenue
                    </Row>
                    <Row className='me-2'>
                        <Card className='p-4 bg-main-dominant-red overlay-revenue' onClick={navigateSales}>
                            <Row>
                                <Form.Select    size="sm"
                                                className='w-auto ms-auto fw-bold'
                                                onClick={handleDropdownClick}>
                                    <option>Day</option>
                                    <option>Month</option>
                                    <option>Year</option>
                                </Form.Select>
                            </Row>
                            <Row>
                                <Col className='m-2 txt-white fs-1 fw-bold'>₱5,105,811.99</Col>
                            </Row>
                            <Row>
                                <Button className='rounded-4 w-auto txt-profit-dark fw-bold shadow' 
                                        variant='light'>
                                    <img src='icon_up_.png'></img>
                                    +28%
                                </Button>
                            </Row>
                        </Card>
                    </Row>
                </Col>

                <Col className='col-4 d-flex flex-column'>
                    <Row className='fw-bold txt-20 my-2'>
                        Item of the Month
                    </Row>
                    <Row className='flex-grow-1'>
                        <Card className='bg-main-dominant-red w-100 p-4' >
                            {/* Content for the Card */}
                        </Card>
                    </Row>
                </Col>
            </Row>

            <ReminderAndStatistics />

        </Container>
    )
}

export default Dashboard