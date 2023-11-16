import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import InventoryItemDetails from './InventoryItemDetails';

const InventoryItemList = ({ inventoryItems }) => {
    return (
        <Card className='rounded-4 shadow'>
            {/* Headings of the inventory items */}
            <Row className='w-100 nopadding my-2'>
                <Col className='txt-gray-text col-3 fs-6 nopadding'>Part Name</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>Brand</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>Motor model</Col>
                <Col className='txt-gray-text col-1 fs-6 nopadding'>Stock No.</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>Retail Price</Col>
                <Col className='txt-gray-text col-2 fs-6 nopadding'>Date Added</Col>
            </Row>

            {/* Loop for Individual Inventory Items */}
            {inventoryItems && inventoryItems.map((inventoryItem) => (
                <InventoryItemDetails key={inventoryItem._id} _id={inventoryItem._id} inventoryItem={inventoryItem} />
            ))}
        </Card>
    );
};

export default InventoryItemList;