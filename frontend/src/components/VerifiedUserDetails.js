import { Row, Col, Modal, Button, Container } from "react-bootstrap";
import { useState } from "react";
import UserDeletionConfirmation from '../components/UserDeletionConfirmation'
import { useNavigate } from 'react-router-dom'

const VerifiedUserDetails = ({userDetail}) => {
    // show     boolean variable that determines if a component is visisble or not
    // setShow  function that changes the variable 'show'
    const [show, setShow] = useState(false);
    
    // function that hides the component
    const handleClose = () => setShow(false);
    // function that shows the component
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const navigateEditUser = () => {
        navigate('/edit-verified-user')
    }
    console.log(userDetail);
    return (
        <>
            {/* Verified Users' Information */}
            <Row onClick={handleShow} className='w-100 nopadding border-top my-1 hover'>
                <Col className='txt-gray-text col-4 fs-6 nopadding'>{userDetail.employeeName}</Col>
                <Col className='txt-gray-text col-4 fs-6 nopadding'>{userDetail.emailAddress}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{userDetail.role}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{userDetail.dateAdded}</Col>
            </Row>
            
            {/* Modal to show individual verified user description and to 
                allow editing and deletion of users */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* Verified User's Name */}
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
                            {/* Verified User's Role */}
                            <Col className='col-6'>
                                {userDetail.role}
                            </Col>
                        </Row>
                        <Row>
                            {/* Verified User's Email */}
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                EMAIL ADDRESS
                            </Col>
                            <Col className='col-6'>
                                {userDetail.emailAddress}
                            </Col>
                        </Row>
                        <Row>
                            {/* Verified User's Date Added */}
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                DATE JOINED
                            </Col>
                            <Col className='col-6'>
                                {userDetail.dateAdded}
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid className='mt-4'>
                        {/* Button to edit verified user */}
                        <Button onClick={navigateEditUser}
                                size='sm' variant='dark' className='me-2 shadow rounded-2 px-4'>Edit</Button>
                        {/* Button to delete a verified user */}
                        <UserDeletionConfirmation />
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    {/* Button to close the modal */}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default VerifiedUserDetails