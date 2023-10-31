import { Modal, Stack, FloatingLabel, Button, Container, Form } from 'react-bootstrap'
import { useState } from "react";


const UserDeletionConfirmation = () => {
    // show     boolean variable that determines if a component is visisble or not
    // setShow  function that changes the variable 'show'
    const [show, setShow] = useState(false);
    
    // function that hides the component
    const handleClose = () => setShow(false);
    // function that shows the component
    const handleShow = () => setShow(true);

    return (
        <>  
            {/* Button to delete users */}
            <Button onClick={handleShow} 
                    size='sm' variant='danger' 
                    className='shadow rounded-2 px-4' >
                Delete
            </Button>

            {/* Modal for deletion confirmation */}
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
                                {/* Input for Administrator Password */}
                                <Form.Control type="password" placeholder="" />
                            </FloatingLabel>
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                {/* Deletes the user */}
                <Button variant="secondary" onClick={handleClose} className='ms-auto px-4'>
                    Proceed
                </Button>
                {/* Does NOT delete the user */}
                <Button variant="danger" onClick={handleClose} className='me-auto px-4'>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default UserDeletionConfirmation