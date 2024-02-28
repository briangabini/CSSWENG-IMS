import { Modal, Stack, Button, Container, Form } from 'react-bootstrap'
import { useState } from "react";
import { DOMAIN } from '../config'

import { useInventoryContext } from '../hooks/useInventoryContext'
import { useAuthContext } from "../hooks/useAuthContext"

const ItemDeletionConfirmation = ({ _id }) => {
    // show     boolean variable that determines if a component is visisble or not
    // setShow  function that changes the variable 'show'
    const [show, setShow] = useState(false);
    const [error, setError] = useState('')
    const { user } = useAuthContext()

    const { dispatch } = useInventoryContext()

    // function that hides the component
    const handleClose = () => setShow(false);
    // function that shows the component
    const handleShow = () => setShow(true);

    const handleDelete = async (e) => {

        if (!user) {
            return
        }

        const response = await fetch(DOMAIN + `/inventory/delete-item/${_id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` },
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            dispatch({ type: 'DELETE_INVENTORY_ITEM', payload: json })

            // 
            console.log('deleted inventory item:', json) // print to console
        }

        handleClose()
    }
    const showDelete = () => {
        if (user.role === "Admin") {
            return <Button onClick={handleShow}
                size='sm' variant='danger'
                className='shadow rounded-2 col-4 txt-16'
            >
                Delete
            </Button>
        }
    }


    return (
        <>
            {/* Button to delete an item */}
            {showDelete()}

            {/* Modal that would ask for confirmation of item deletion */}
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
                    {/* Deletes the item when clicked */}
                    <Button variant="secondary" onClick={handleDelete} className='ms-auto px-4'>
                        Proceed
                    </Button>
                    {/* Does NOT delete the item when clicked */}
                    <Button variant="danger" onClick={handleClose} className='me-auto px-4'>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ItemDeletionConfirmation