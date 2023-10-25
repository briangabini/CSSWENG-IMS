import { Col, Row } from "react-bootstrap"

const InventoryItemDetails = ({inventoryItem}) => {
    return (
        // <div className="inventory-item-details">
        //     <p>Part Name: {inventoryItem.partName}</p>
        //     <p>Brand: {inventoryItem.brand}</p>
        //     <p>Motor Model: {inventoryItem.motorModel}</p>
        //     <p>Stock Number: {inventoryItem.stockNumber}</p>
        //     <p>Retail Price: {inventoryItem.retailPrice}</p>
        // </div>

    <Row className='w-100 nopadding my-2'>
        <Col className='txt-gray-text col-3 fs-6 nopadding'>{inventoryItem.partName}</Col>
        <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.brand}</Col>
        <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.motorModel}</Col>
        <Col className='txt-gray-text col-1 fs-6 nopadding'>{inventoryItem.stockNumber}</Col>
        <Col className='txt-gray-text col-2 fs-6 nopadding'>{inventoryItem.retailPrice}</Col>
        <Col className='txt-gray-text col-2 fs-6 nopadding'>Date Added</Col>
    </Row>
    )
}

export default InventoryItemDetails