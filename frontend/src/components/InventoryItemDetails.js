import { Container, Col, Row, Modal, Button } from "react-bootstrap"
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
            <Modal className="modal-lg nopadding nomargin modalCenter" show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-background-red">
                    <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-background-red rounded">

                    <Row className="my-2">
                        <h3>{inventoryItem.partName}</h3>
                        <Col className="col-8">
                            <Row className="pt-3">
                                <h5>Basic Information</h5>
                                <Col>
                                    <p>BRAND</p>
                                </Col>
                                <Col>
                                    <p>{inventoryItem.brand}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>MOTORCYCLE MODEL</p>
                                </Col>
                                <Col>
                                    <p>{inventoryItem.motorModel}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>DATE ADDED</p>
                                </Col>
                                <Col>
                                    <p>{inventoryItem.dateAdded}</p>
                                </Col>
                            </Row>
                            <Row className="pt-3">
                                <h5>Sales Information</h5>
                                <Col>
                                    <p>RETAIL PRICE</p>
                                </Col>
                                <Col>
                                    <p>{inventoryItem.retailPrice}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>WHOLESALE PRICE</p>
                                </Col>
                                <Col>
                                <p>{inventoryItem.wholesalePrice}</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col className="col-4">
                            <Row className='mx-auto py-1 justify-content-end'>
                                <Button className="shadow rounded-2 col-4 mx-2 bg-white txt-black txt-16 border-0" onClick={navigateEditItem}>Edit</Button>
                                <ItemDeletionConfirmation _id={_id}/>
                            </Row>

                            <Row className="py-3 mx-auto">
                                <Container className="bg-stocks-good rounded py-4">
                                    {/**THE BG-COLOR WILL BE CHANGED. WILL USE A FUNCTION TO CHANGE COLOR DEPENDING ON STOCK */}
                                    <h4 className="text-center">Current Stocks</h4>
                                    <h1 className="text-center py-2">{inventoryItem.stockNumber}</h1>
                                    <p className="text-center">Sufficient amount of stocks remaining</p>
                                        {/**THE TEXT ITSELF WILL BE CHANGED. WILL USE A FUNCTION TO CHANGE TEXT DEPENDING ON STOCK */}
                                </Container>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default InventoryItemDetails