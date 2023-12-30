import { Row, Col, Form, Button } from 'react-bootstrap';
import { DOMAIN } from '../config';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';

const CartItemDetails = ({ _id, item, showPrice, handleCheckboxChange, isSelected, tick, setTick }) => {
    const { user } = useAuthContext();
    const [quantity, setQuantity] = useState(item.quantity);
    const [loading, setLoading] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const deductQuantity = async () => {
        const inventoryId = item.inventoryItem._id;

        if (!loading) {
            setLoading(true);
            setClickCount((prevClickCount) => prevClickCount + 1);

            const data = {
                userId: user._id,
                inventoryId: inventoryId,
            };

            try {
                const response = await fetch(DOMAIN + `/cart/deductItemFromCart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    setQuantity((prevQuantity) => prevQuantity - 1);
                    console.log('Quantity deducted successfully');

                    setTick((prevTick) => prevTick + 1);
                } else {
                    console.log('Failed to deduct quantity');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const addQuantity = async () => {
        const inventoryId = item.inventoryItem._id;

        if (!loading) {
            setLoading(true);
            setClickCount((prevClickCount) => prevClickCount + 1);

            const data = {
                userId: user._id,
                inventoryId: inventoryId,
            };

            try {
                const response = await fetch(DOMAIN + `/cart/addItemToCart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(data),
                });

                console.log('status: ', response.ok);

                if (response.ok) {
                    setQuantity((prevQuantity) => prevQuantity + 1);
                    console.log('Quantity added successfully');
                    console.log('New quantity: ', quantity);

                    setTick((prevTick) => prevTick + 1);
                } else {
                    console.log('Failed to add quantity');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    /* return (
        <>
            <div>{showPrice}</div>
            <div>{item.inventoryItem.wholesalePrice}</div>
            <div>{item.inventoryItem.retailPrice}</div>
        </>

    ) */

    return (
        <Row fluid className='mb-2'>
            <Col className='col-1'>
                <Form.Check
                    type={'checkbox'}
                    className=''
                    id={_id}
                    checked={isSelected}
                    onChange={() => { handleCheckboxChange(_id) }}
                />
            </Col>
            <Col className='col-4 text-wrap'>
                {item.inventoryItem.partName}
            </Col>
            <Col className='col-3 nopadding d-flex justify-content-center'>
                <Button variant="outline-dark" className='nopadding px-2 m-auto height-content' onClick={deductQuantity}>-</Button>
                <span className='m-auto'> {quantity} </span>
                <Button variant="outline-dark" className='nopadding px-2 m-auto height-content' onClick={addQuantity}>+</Button>
            </Col>
            {showPrice === 'retail' &&
                <Col className='col-3 text-wrap ps-2 nopadding ms-1 d-flex'>
                    <span className='my-auto'>{item.inventoryItem.retailPrice}</span>
                </Col>
            }
            {showPrice === 'wholesale' &&
                <Col className='col-3 text-wrap ps-2 nopadding ms-1 d-flex'>
                    <span className='my-auto'>{item.inventoryItem.wholesalePrice}</span>
                </Col>
            }
        </Row>
    );
};

export default CartItemDetails;
