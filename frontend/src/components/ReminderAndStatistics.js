// bootstrap
import {Container, Row, Col, Card, Dropdown, DropdownButton} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DOMAIN } from '../config';
import { useAuthContext } from '../hooks/useAuthContext.js'

const ReminderAndStatistics = () => {

    const [cartItemQuantity, setCartItemQuantity] = useState(0)
    const [lowStockItemQuantity, setLowStockItemQuantity] = useState(0)

    // get the data of the user from the context
    const { user } = useAuthContext()
    

    const getTotalCartQuantity = async () => {
    try {
        const response = await fetch(`${DOMAIN}/cart/getTotalCartQuantity/${user._id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });

        if (response.ok) {
            const json = await response.json();
            setCartItemQuantity(json.totalQuantity);
        } else {
            // Handle non-successful response (e.g., show an error message)
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error('Error fetching cart quantity:', error.message);
    }
}
    const getDangerZoneItemCount = async () => {
        try {
            const response = await fetch(`${DOMAIN}/inventory/getDangerZoneItemCount`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (response.ok) {
                const json = await response.json();
                setLowStockItemQuantity(json.dangerZoneItemCount);
            } else {
                // Handle non-successful response (e.g., show an error message) 
                // console.error(`Error: ${response.status} - ${response.statusText}`); 
            }
        } catch (error) {
            // Handle network or unexpected errors
            // console.error('Error fetching danger zone item count:', error.message);
        }
    };

    useEffect(() => {
        getTotalCartQuantity()
        // getDangerZoneItemCount()
    }, [])

    const navigate = useNavigate();

    const navigateCalendar = () => {
        navigate(`/calendar`);
    };

    const navigateCart = () => {
        navigate(`/shopping-cart`);
    }

    const navigatePayments = () => {
        navigate(`/payments`);
    }

    const navigateInventory = () => {
        navigate(`/inventory`)
    }

    return (
       
        <Row className='justify-content-center'>
            {/* Payment Reminder Section */}
            {/* When clicked, would go to calendar page */}
            <Col className='h-100 col-4' onClick={navigateCalendar}>
                <Row className='fw-bold txt-20 my-2'>
                    Upcoming Reminder
                </Row>
                <Row>
                    {/* Shows the upcoming payment reminder */}
                    <Card className='bg-main-dominant-red overlay-reminder w-auto txt-white'>
                        <Card.Body>
                            {/* Date of the upcoming reminder */}
                            <Card.Title className='txt-16 fw-bold'>September 20</Card.Title>
                            {/* Day of the upcoming reminder */}
                            <Card.Subtitle className='txt-14 '>Saturday</Card.Subtitle>
                            {/* Who to send payment to */}
                            <Card.Text className='txt-20 fw-bold my-4'>Send payment to Arai helmet suppliers</Card.Text>
                        </Card.Body>
                    </Card>                    
                </Row>
            </Col>

            <Col className='col-8' style={{ display: 'flex', flexDirection: 'column' }}>
                <Row className='h-auto fw-bold txt-20'>
                    <Col className='my-2'>Statistics</Col>
                </Row>
                <Row className='h-auto d-flex align-items-stretch' style={{ flex: 1 }}>

                    {/* Items in Cart Section */}
                    {/* When clicked, would go to shopping cart page */}
                    <Col className='h-auto' onClick={navigateCart}>
                        <Card className='w-auto bg-card1-red overlay-items-in-cart h-100'>
                            <Card.Body>
                                {/* Number of items in cart */}
                                <Card.Title className='txt-32 fw-bold'>{cartItemQuantity}</Card.Title>
                                <Card.Subtitle className='txt-14'>Items in Cart</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Weekly Payments Due Section */}
                    {/* When clicked, would go to payments page */}
                    <Col className='h-auto' onClick={navigatePayments}>
                        <Card className='bg-card2-red overlay-payments-due h-100'>
                            <Card.Body>
                                {/* Number of Weekly Payments Due */}
                                <Card.Title className='txt-32 fw-bold'>3</Card.Title>
                                <Card.Subtitle className='txt-14'>Weekly Payments Due</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Low-Stock Items Due Section */}
                    {/* When clicked, would go to inventory page */}
                    <Col className='h-auto' onClick={navigateInventory}>
                        <Card className='bg-main-dominant-red overlay-low-stock h-100'>
                            <Card.Body>
                                {/* Number of Low-Stock Items */}
                                <Card.Title className='txt-32 fw-bold'>{lowStockItemQuantity}</Card.Title>
                                <Card.Subtitle className='txt-14'>Low-Stock Items</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ReminderAndStatistics