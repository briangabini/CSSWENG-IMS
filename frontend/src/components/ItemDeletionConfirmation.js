import { Modal, Stack, Button, Container, Form } from 'react-bootstrap'
import { useState } from "react";
const DOMAIN = require('../config')

const ItemDeletionConfirmation = ({_id}) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState('')
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (e) => {

            

            const response = await fetch(DOMAIN + `/inventory/delete-item/${_id}`, {
                method: 'DELETE',
            })

            /* 
             const response = await fetch('/api/workouts', {
             method: 'POST',
              body: JSON.stringify(workout),
             headers: {
               'Content-Type': 'application/json'
          }
        })
        
          const json = await response.json()
            */

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                console.log('deleted inventory item:', json) // print to console
            }
        

        handleClose()
    }



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
                            <div className='mx-auto mt-3 fs-4 text-center'>
                                Are you sure you want to delete this item?
                            </div>
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDelete} className='ms-auto px-4'>
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

export default ItemDeletionConfirmation