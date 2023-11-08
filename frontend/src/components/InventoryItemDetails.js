import { Container, Col, Row, Modal, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import ItemDeletionConfirmation from "./ItemDeletionConfirmation";
import moment from 'moment'                                         // for date formatting

// helper functions


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

    const StockMessage = ({inventoryItem, _id}) => {
        if(inventoryItem.stockNumber > 5){
            return 
        }
        else if(inventoryItem.stockNumber <= 5){
            return 
        }
        else if(inventoryItem.stockNumber === 0){
            return 
        }
    }

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
                <Col className='txt-gray-text col-2 fs-6 nopadding'>{moment(inventoryItem.dateAdded).format('MM/DD/YYYY')}</Col>
                {/* for testing purposes */}
            </Row>
            
            {/* The modal for an inventory item */}
            {/* Shows more details of the inventory item */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <h3>{inventoryItem.partName}</h3>
                    <Row className='py-1'>
                        <Button onClick={navigateEditItem}>Edit</Button>
                        <ItemDeletionConfirmation _id={_id}/>
                    </Row>

                    <Container className="bg-success rounded py-3 my-3">
                        <h4 className="text-center">Current Stocks</h4>
                        <h1 className="text-center">{inventoryItem.stockNumber}</h1>
                        <p className="text-center">Sufficient amount of stocks remaining</p>
                    </Container>
                    
                    <Row className="pt-2">
                        <h5>Basic Information</h5>
                        <Col className="col-sm">
                            <p>BRAND</p>
                        </Col>
                        <Col className="col-sm">
                            <p>{inventoryItem.brand}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-sm">
                            <p>MOTORCYCLE MODEL</p>
                        </Col>
                        <Col className="col-sm">
                            <p>{inventoryItem.motorModel}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-sm">
                            <p>RETAIL PRICE</p>
                        </Col>
                        <Col className="col-sm">
                            <p>{inventoryItem.retailPrice}</p>
                        </Col>
                    </Row>


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