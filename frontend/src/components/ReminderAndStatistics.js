// bootstrap
import {Container, Row, Col, Card, Dropdown, DropdownButton} from 'react-bootstrap'

const ReminderAndStatistics = () => {

    return (
       
        <Row className='justify-content-center'>
            <Col className='h-100 col-4'>
                <Row className='fw-bold txt-20 my-2'>
                    Upcoming Reminder
                </Row>
                <Row>
                    <Card className='bg-main-dominant-red overlay-reminder w-auto txt-white'>
                        <Card.Body>
                            <Card.Title className='txt-16 fw-bold'>September 20</Card.Title>
                            <Card.Subtitle className='txt-14 '>Saturday</Card.Subtitle>
                            <Card.Text className='txt-20 fw-bold my-4'>Send payment to Arai helmet suppliers</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>

            <Col className='col-8' style={{ display: 'flex', flexDirection: 'column' }}>
                <Row className='h-auto fw-bold txt-20'>
                    <Col className='my-2'>Statistics</Col>
                </Row>
                <Row className='h-auto d-flex align-items-stretch' style={{ flex: 1 }}>
                    <Col className='h-auto'>
                        <Card className='w-auto bg-card1-red overlay-items-in-cart h-100'>
                            <Card.Body>
                                <Card.Title className='txt-32 fw-bold'>5</Card.Title>
                                <Card.Subtitle className='txt-14'>Items in Cart</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='h-auto'>
                        <Card className='bg-card2-red overlay-payments-due h-100'>
                            <Card.Body>
                                <Card.Title className='txt-32 fw-bold'>3</Card.Title>
                                <Card.Subtitle className='txt-14'>Weekly Payments Due</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='h-auto'>
                        <Card className='bg-main-dominant-red overlay-low-stock h-100'>
                            <Card.Body>
                                <Card.Title className='txt-32 fw-bold'>6</Card.Title>
                                <Card.Subtitle className='txt-14'>Low-Stock Items</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ReminderAndStatistics