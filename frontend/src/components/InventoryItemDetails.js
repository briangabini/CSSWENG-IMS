import { Col, Row, Modal, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import ItemDeletionConfirmation from "./ItemDeletionConfirmation";

const InventoryItemDetails = ({ inventoryItem, _id }) => {
    const navigate = useNavigate();

    const navigateEditItem = () => {
        navigate(`/edit-item/${_id}`);
    };
    // show     boolean variable that determines if a component is visisble or not
    // setShow  function that changes the variable 'show'
    const [show, setShow] = useState(false);

    // function that hides the component
    const handleClose = () => setShow(false);
    // function that shows the component
    const handleShow = () => setShow(true);

    return (
        <>
            {/* The details of an inventory item */}
            {/* When clicked, the modal of the item is shown */}
            <Row onClick={handleShow} className='w-100 nopadding my-2 hover'>
                <Col className='txt-gray-text col-3 fs-6 nopadding'>{inventoryItem.partName}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.brand}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.motorModel}</Col>
                <Col className='txt-gray-text col-1 fs-6 nopadding'>{inventoryItem.stockNumber}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.retailPrice}</Col>
                <Col className='txt-gray-text col-1 fs-6 nopadding'>Date Added</Col>
            </Row>
            
            {/* The modal for an inventory item */}
            {/* Shows more details of the inventory item */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={navigateEditItem}>Edit Item</Button>
                    <ItemDeletionConfirmation _id={_id} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default InventoryItemDetails