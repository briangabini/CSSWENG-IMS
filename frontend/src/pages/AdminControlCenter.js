// bootstrap
import {Container, Row, Col, Card, Dropdown, DropdownButton} from 'react-bootstrap'
import ReminderAndStatistics from '../components/ReminderAndStatistics'

const AdminControlCenter = () => {

    return (

        <Container className='main'>
            <Row className='fs-2 fw-bold col-12'>
                Good day, Justin Depano.
            </Row>

            <Row >
                <Col className='col-8'>
                    <Row className='fw-bold txt-20 my-2'>
                        Revenue
                    </Row>
                    <Row className='me-2'>
                        <Card className='p-4 bg-main-dominant-red overlay-revenue'>
                            <Row>
                                <DropdownButton id="dropdown-item-button" title="Month" align="end"
                                                className='d-flex flex-row-reverse'
                                                variant='light'>
                                    <Dropdown.Item as="button">Day</Dropdown.Item>
                                    <Dropdown.Item as="button">Month</Dropdown.Item>
                                    <Dropdown.Item as="button">Year</Dropdown.Item>
                                </DropdownButton>
                            </Row>
                            <Row>
                                <Col className='m-2 txt-white fs-1 fw-bold'>₱5,105,811.99</Col>
                            </Row>
                            <Row>
                                <Card className='w-auto'>
                                    +28%
                                </Card>
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

export default AdminControlCenter