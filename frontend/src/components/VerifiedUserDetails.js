import { Row, Col, Modal, Button, Container } from "react-bootstrap";
import { useState } from "react";
import UserDeletionConfirmation from '../components/UserDeletionConfirmation'
import { useNavigate } from 'react-router-dom'

const VerifiedUserDetails = ({userDetail}) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const navigateEditUser = () => {
        navigate('/edit-verified-user')
    }
    console.log(userDetail);
    return (
        <>
            <Row onClick={handleShow} className='w-100 nopadding border-top my-1 hover'>
                <Col className='txt-gray-text border col-4 fs-6 nopadding'>{userDetail.employeeName}</Col>
                <Col className='txt-gray-text border col-4 fs-6 nopadding'>{userDetail.emailAddress}</Col>
                <Col className='txt-gray-text border col-2 fs-6 nopadding'>{userDetail.role}</Col>
                <Col className='txt-gray-text border col-2 fs-6 nopadding'>{userDetail.dateAdded}</Col>
            </Row>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fs-2 fw-bold'>{userDetail.employeeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='ms-3'>
                        <Row className='fs-4 fw-bold mb-2'>
                            Basic Information
                        </Row>
                        <Row>
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                ROLE/POSITION
                            </Col>
                            <Col className='col-6'>
                                {userDetail.role}
                            </Col>
                        </Row>
                        <Row>
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                EMAIL ADDRESS
                            </Col>
                            <Col className='col-6'>
                                {userDetail.emailAddress}
                            </Col>
                        </Row>
                        <Row>
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                DATE JOINED
                            </Col>
                            <Col className='col-6'>
                                {userDetail.dateAdded}
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid className='mt-4'>
                        <Button onClick={navigateEditUser}
                                size='sm' variant='dark' className='me-2 shadow rounded-2 px-4'>Edit</Button>
                        <UserDeletionConfirmation />
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default VerifiedUserDetails