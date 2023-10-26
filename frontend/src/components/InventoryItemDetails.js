import { Button, Col, Row, Modal, Container, Card } from "react-bootstrap"
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
                    <Modal.Title className='fs-2 fw-bold'>{inventoryItem.partName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Container fluid className=''>
                        {/**Insert if statement to change color depending on stock quality. Will be green for now */}
                        <Card className='yellow'>
                            <Row className='fw-bold mx-auto pt-3 h5'>
                                Current Stocks
                            </Row>
                            <Row className='mx-auto pt-3 h1'>
                                {inventoryItem.stockNumber}
                            </Row>
                            {/**Insert if statement to show text depending on stocks. */}
                            <Row className="mx-auto pt-3 pb-3">
                                Critical stocks remaining!
                            </Row>
                        </Card>

                    </Container>

                    <Container className='ms-3'>
                        <Row className='fs-4 fw-bold mb-2 pt-3'>
                            Basic Information
                        </Row>
                        <Row className="pt-2">
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                BRAND
                            </Col>
                            <Col className='col-6'>
                                {inventoryItem.brand}
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                COMPATIBLE MOTORCYCLE MODEL
                            </Col>
                            <Col className='col-6'>
                                {inventoryItem.motorModel}
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                LAST UPDATED
                            </Col>
                            <Col className='col-6'>
                                *insert date here*
                            </Col>
                        </Row>

                        <Row>
                            <Row className='fs-4 fw-bold mb-2 pt-3'>
                                Sales Information
                            </Row>
                        </Row>
                        <Row className="pt-2">
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                RETAIL PRICE
                            </Col>
                            <Col className='col-6'>
                                {inventoryItem.retailPrice}
                            </Col>
                        </Row>
                        <Row className="pt-1">
                            <Col className='txt-gray-text col-4 me-2 fw-bold'>
                                WHOLESALE PRICE
                            </Col>
                            <Col className='col-6'>
                                *insert wholesale price here*
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid className='mt-4'>
                        <Button onClick={navigateEditItem}
                                size='sm' variant='dark' className='me-2 shadow rounded-2 px-4'>Edit</Button>
                        <ItemDeletionConfirmation />
                    </Container>

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