import { Col, Row, Button, Card } from "react-bootstrap"
import { useTransactionTypeContext } from '../hooks/useTransactionTypeContext'

// helper functions


const ShopCartInvenItemDetails = ({ inventoryItem, _id, showPrice, onAddToCart}) => {
    const {transactionType} = useTransactionTypeContext()
    showPrice = transactionType

    // console.log(showPrice)

    // all, retail, wholesale
    const priceShow = () => {
        if (showPrice === 'retail') {
            // console.log('retail in priceShow')
            return <Row className='fs-6 txt-white ms-2'>Price: {inventoryItem.retailPrice}</Row>
        } else if (showPrice === 'wholesale') {
            // console.log('wholesale in priceShow')
            return <Row className='fs-6 txt-white ms-2'>Price: {inventoryItem.wholesalePrice}</Row>
        } else {
            return <>
                <Row className='fs-6 txt-white ms-2'>Price: {inventoryItem.retailPrice}</Row>
                <Row className='fs-6 txt-white ms-2'>Price: {inventoryItem.wholesalePrice}</Row>
            </>
        }
    }
    
    return (
        <>
            <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                <Row>

                    <Col className='col-10'>
                        <Row className='fs-4 fw-bold txt-white ms-2'>
                            {inventoryItem.partName}
                        </Row>
                        
                        {priceShow()}
                        
                        <Row className='fs-6 txt-white ms-2'>
                            Brand: {inventoryItem.brand}
                        </Row>
                        <Row className='fs-6 txt-white ms-2'>
                            Stock: {inventoryItem.stockNumber} left
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
            </Card> 
                   

        </>
    )
}

export default ShopCartInvenItemDetails