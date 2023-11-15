// bootstrap
import {Container, Row, Col, Card} from 'react-bootstrap'
import ReminderAndStatistics from '../components/ReminderAndStatistics'
import { useNavigate } from 'react-router-dom'

const AdminControlCenter = () => {
    const navigate = useNavigate();

    const navigateAuditLog = () => {
        navigate(`/audit-log`);
    };

    const navigateVerifiedUsersList = () => {
        navigate(`/verified-user-list`)
    }

    return (

        <Container className='main'>
            <Row className='fs-2 fw-bold col-12'>
                Good day, Justin Depano.
            </Row>

            <Row className='pe-2'>
                {/* Audit Log Section*/}
                {/* When this section is clicked, would navigate to Audit Log Page */}
                <Col className='col-8' onClick={navigateAuditLog}>
                    <Row className='fw-bold txt-20 my-2'>
                        Audit Log
                    </Row>
                    <Row className='me-2'>
                        <Card className='p-4 bg-main-dominant-red overlay-audit-log'>
                            <Row>
                                {/* Name of Employee who recently made an action */}
                                <Col className='m-2 txt-white fs-1 fw-bold'>Juan Dela Cruz</Col>
                            </Row>
                            <Row>
                                {/* The most recent action of the employee */}
                                <Col className='ms-2 mb-3 txt-white fs-5'>
                                    adjusted the stock number of “Arai Astro Light Helmet” from “16” to “15”
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                </Col>
                
                {/* Verified User List Section */}
                {/* When this section is clicked, would navigate to Verified User List Page */}
                <Col className='w-auto d-flex flex-column' onClick={navigateVerifiedUsersList}>
                    <Row className='fw-bold txt-20 my-2'>
                        Verified User List
                    </Row>
                    <Row className='flex-grow-1'>
                        <Card className='bg-main-dominant-red w-100 p-4 overlay-user-list flex-grow-1'>
                        <Row className='h-100 d-flex align-items-end'>
                            {/* The current number of verified users */}
                            <Col className='text-center txt-white fw-bold fs-5'>
                                8 Verified Users
                            </Col>
                        </Row>
                        </Card>
                    </Row>
                </Col>
            </Row>

            <ReminderAndStatistics />

        </Container>
    )
}

export default AdminControlCenter