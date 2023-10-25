import { Modal, Stack, FloatingLabel, Button, Container, Form } from 'react-bootstrap'
import { useState } from "react";


const UserDeletionConfirmation = () => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>  
            <Button onClick={handleShow} 
                    size='sm' variant='danger' 
                    className='shadow rounded-2 px-4' >
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Container>
                        <Stack>
                            <div className='mx-auto'><img src='exclamation_mark.png'></img></div>
                            <div className='mx-auto mt-3 fs-4 text-center'>Please type the administrator password to confirm deletion</div>
                            <FloatingLabel
                                label="Administrator Password"
                                className="my-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} className='ms-auto px-4'>
                    Proceed
                </Button>
                <Button variant="danger" onClick={handleClose} className='me-auto px-4'>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default UserDeletionConfirmation