import {Row, Col, Form, Button } from 'react-bootstrap'

const CartItemDetails = () => {

    return (
        <Row fluid className='mb-2'>
            <Col className='col-1'>
                <Form.Check
                    type='checkbox'
                    className=''
                />
            </Col>
            <Col className='col-4 text-wrap'>
                Lorem Ipsum Lorem Ipsum..
            </Col>
            <Col className='col-3 nopadding d-flex justify-content-center'>
                <Button variant="outline-dark" className='nopadding px-2 my-2'>-</Button>
                <span className='mx-1 my-2'> 10000 </span>
                <Button variant="outline-dark" className='nopadding px-2 my-2'>+</Button>
            </Col>
            <Col className='col-3 text-wrap ps-2 nopadding'>
                ₱515.03
            </Col>
        </Row>
    )
}

export default CartItemDetails


