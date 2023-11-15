import { Button, Col, Row, Modal, Container, Card } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import ItemDeletionConfirmation from "./ItemDeletionConfirmation";
import moment from 'moment'                                         // for date formatting
import { useTransactionTypeContext } from '../hooks/useTransactionTypeContext'
// helper functions


const InventoryItemDetails = ({ inventoryItem, _id, showPrice}) => {
    const navigate = useNavigate();
    const {transactionType} = useTransactionTypeContext()
    showPrice = transactionType

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

    // console.log(showPrice)

    // all, retail, wholesale
    const priceShow = () => {
        if (showPrice === 'retail') {
            // console.log('retail in priceShow')
            return <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.retailPrice}</Col>
        } else if (showPrice === 'wholesale') {
            // console.log('wholesale in priceShow')
            return <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.wholesalePrice}</Col>
        } else {
            return <>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.retailPrice}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.wholesalePrice}</Col>
            </>
        }
    }

    return (
        <>
            {/* The details of an inventory item */}
            {/* When clicked, the modal of the item is shown */}
            <Row onClick={handleShow} className='w-100 nopadding my-2 hover'>
                <Col className='txt-gray-text col-2 fs-6 nopadding text-truncate'>{inventoryItem.partName}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.brand}</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.motorModel}</Col>
                <Col className='txt-gray-text col-1 fs-6 nopadding'>{inventoryItem.stockNumber}</Col>
                {priceShow()}
                <Col className='txt-gray-text col-1 fs-6 nopadding text-truncate'>{moment(inventoryItem.dateAdded).format('MM/DD/YYYY')}</Col>
                {/* for testing purposes */}
            </Row>
            
            {/* The modal for an inventory item */}
            {/* Shows more details of the inventory item */}
            

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className='fs-2 fw-bold'>{inventoryItem.partName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Container fluid className=''>
                            {/**Insert if statement to change color depending on stock quality. Will be yellow for now */}
                            <Card className='bg-warning'>
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

        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fs-2 fw-bold'>{inventoryItem.partName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                            <Row className="pt-1">
                                <Col className="txt-gray-text me-2 pt-3">
                                    Last edited at *insert time here*
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
                        <Row className="pt-1">
                            <Col className="txt-gray-text me-2 pt-3">
                                Last edited at *insert time here*
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