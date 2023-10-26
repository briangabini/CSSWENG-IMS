import { Button, Col, Row, Modal } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import ItemDeletionConfirmation from "./ItemDeletionConfirmation";

const InventoryItemDetails = ({inventoryItem}) => {
    const navigate = useNavigate();
    
    const navigateEditItem = () => {
        navigate('/edit-item');
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        // <div className="inventory-item-details">
        //     <p>Part Name: {inventoryItem.partName}</p>
        //     <p>Brand: {inventoryItem.brand}</p>
        //     <p>Motor Model: {inventoryItem.motorModel}</p>
        //     <p>Stock Number: {inventoryItem.stockNumber}</p>
        //     <p>Retail Price: {inventoryItem.retailPrice}</p>
        // </div>

    <>
        <Row onClick={handleShow} className='w-100 nopadding my-2'>
            <Col className='txt-gray-text col-3 fs-6 nopadding'>{inventoryItem.partName}</Col>
            <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.brand}</Col>
            <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.motorModel}</Col>
            <Col className='txt-gray-text col-1 fs-6 nopadding'>{inventoryItem.stockNumber}</Col>
            <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.retailPrice}</Col>
            <Col className='txt-gray-text col-1 fs-6 nopadding'>Date Added</Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            {/* Edit Item Button */}
            <Button onClick={navigateEditItem}>Edit Item</Button>
            {/* Delete Item Confirmation Modal */}
            <ItemDeletionConfirmation />
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