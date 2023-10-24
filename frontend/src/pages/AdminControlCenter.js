// bootstrap
import {Container, Row, Col, Card} from 'react-bootstrap'
import ReminderAndStatistics from '../components/ReminderAndStatistics'
import { Link } from 'react-router-dom'

const AdminControlCenter = () => {

    return (

        <Container className='main'>
            <Row className='fs-2 fw-bold col-12'>
                Good day, Justin Depano.
            </Row>

            <Row className='pe-2'>
                <Col className='col-8'>
                <Link to="/audit-log" style={{textDecoration:'none', margin:0, padding:0, color:'black'}}>
                        <Row className='fw-bold txt-20 my-2'>
                            Audit Log
                        </Row>
                        <Row className='me-2'>
                            <Card className='p-4 bg-main-dominant-red overlay-audit-log'>
                                <Row>
                                    <Col className='m-2 txt-white fs-1 fw-bold'>Juan Dela Cruz</Col>
                                </Row>
                                <Row>
                                    <Col className='ms-2 mb-3 txt-white fs-5'>
                                        adjusted the stock number of “Arai Astro Light Helmet” from “16” to “15”
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </Link>
                </Col>
                
                <Col className='w-auto d-flex flex-grow-1'>
                    <Link className='d-flex flex-column flex-grow-1' to="/verified-user-list" style={{textDecoration:'none', margin:0, padding:0, color:'black'}}>
                        <Row className='fw-bold txt-20 my-2'>
                            Verified User List
                        </Row>
                        
                        <Row className='flex-grow-1'>
                            <Card className='bg-main-dominant-red w-100 p-4 overlay-user-list' >
                                <Row className='h-100 d-flex align-items-end'>
                                    <Col className='text-center txt-white fw-bold fs-5'>
                                        8 Verified Users
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </Link>
                </Col>
            </Row>

            <ReminderAndStatistics />

        </Container>
    )
}

export default AdminControlCenter