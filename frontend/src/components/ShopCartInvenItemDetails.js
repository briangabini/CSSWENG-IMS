import { Container, Col, Row, Modal, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import ItemDeletionConfirmation from "./ItemDeletionConfirmation";
import moment from 'moment'                                         // for date formatting
import { useTransactionTypeContext } from '../hooks/useTransactionTypeContext'
import { DOMAIN } from '../config'
import { useAuthContext } from '../hooks/useAuthContext.js'

// helper functions


const ShopCartInvenItemDetails = ({ inventoryItem, _id, showPrice, onAddToCart}) => {
    const { user } = useAuthContext()
    const {transactionType} = useTransactionTypeContext()
    showPrice = transactionType

    // console.log(showPrice)

    // all, retail, wholesale
    const priceShow = () => {
        if (showPrice === 'retail') {
            // console.log('retail in priceShow')
            return <Row className='fs-6 txt-white ms-2'>{inventoryItem.retailPrice}</Row>
        } else if (showPrice === 'wholesale') {
            // console.log('wholesale in priceShow')
            return <Row className='fs-6 txt-white ms-2'>{inventoryItem.wholesalePrice}</Row>
        } else {
            return <>
                <Row className='fs-6 txt-white ms-2'>{inventoryItem.retailPrice}</Row>
                <Row className='fs-6 txt-white ms-2'>{inventoryItem.wholesalePrice}</Row>
            </>
        }
    }
    
    return (
        <>
            <Row className='w-100 nopadding my-2'>
                <Col className='col-10'>
                    <Row className='fs-4 fw-bold txt-white ms-2'>
                        {inventoryItem.partName}
                    </Row>
                    
                    {priceShow()}
                    
                    <Row className='fs-6 txt-white ms-2'>
                        {inventoryItem.brand}
                    </Row>
                    <Row className='fs-6 txt-white ms-2'>
                        {inventoryItem.stockNumber}
                    </Row>
                </Col>
                <Col className='col-2'>
                    <Button
                        className='bg-white txt-main-dominant-red fw-bold border-0'
                        onClick={onAddToCart}>
                        +
                    </Button>
                </Col>
            </Row>
            

        </>
    )
}

export default ShopCartInvenItemDetails