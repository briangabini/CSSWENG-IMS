import { useNavigate, Link } from 'react-router-dom'
import Sidebar from './Sidebar.js'
import { Container, Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap'
import { useState } from 'react';

import { useLogout } from '../hooks/useLogout.js'
import { useAuthContext } from '../hooks/useAuthContext.js'
import { useTransactionType } from '../hooks/useTransactionType.js';

import { DOMAIN } from '../config'

const NavigationBar = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { setRetail, setWholesale } = useTransactionType()

    const handleClick = () => {
        logout()
        navigateLogin()
    }

    const navigate = useNavigate();

    const navigateShoppingCart = (e) => {
        navigate(`/shopping-cart`);

        handleClose();
    };

    const handleTransactionClick = async (e) => {
        try {
            let transactionType = e.target.id;
            const userId = user._id;

            // Check if a cart exists
            const response = await fetch(`${DOMAIN}/cart/getCartDetailsByUserId/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (response.ok) {
                const json = await response.json();

                console.log(json);

                // Check if the current transaction type is selected by the user
                if (json.transactionType === transactionType) {
                    // Navigate to the existing shopping cart
                    transactionType === 'retail' ? setRetail() : setWholesale();
                    navigateShoppingCart();

                    console.log('The cart exists with the same transaction type');
                    return;
                } else {
                    console.log('Deleting cart');
                    // Delete the existing cart
                    await fetch(`${DOMAIN}/cart/cancelOrder`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ userId }),
                    });
                }
            }

            console.log('Creating cart');

            // Create a new cart
            const response2 = await fetch(`${DOMAIN}/cart/createCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ userId, transactionType }),
            });

            if (response2.ok) {
                console.log('Successful cart creation');
            } else {
                console.log(response.error)
            }

            console.log('All requests completed');

            // Execute function based on the value (transaction type)
            transactionType === 'retail' ? setRetail() : setWholesale();

            // Refresh the page
            navigateShoppingCart();

        } catch (error) {
            console.error('Error handling transaction click:', error.message);
            // Handle error, show an error message, or perform other actions
        }
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigateLogin = () => {
        navigate(`/`);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {user &&
                        <Sidebar />
                    }
                    <Navbar.Brand href="/dashboard" className='ms-3'>JPDGarage</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                            <Nav.Link href="#link">{user && user.employeeName}</Nav.Link>
                            {
                                user && (
                                    <Nav.Link href='/'>
                                        <button onClick={handleClick} style={{ border: 'none', background: 'none', padding: 0 }}>
                                            <img src='power.svg'>
                                            </img>
                                        </button>
                                    </Nav.Link>
                                )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Container className='text-center fs-2 fw-bold'>
                        Choose Type of Transaction:
                        <Container className='d- mt-4'>
                            {/* button for selecting retail price */}
                            <Button
                                className='border-0 ms-auto me-3 px-4 py-2 bg-main-dominant-red'
                                onClick={handleTransactionClick}
                                id="retail"
                            >
                                Retail
                            </Button>

                            {/* button for selecting wholesale price */}
                            <Button
                                className='border-0 me-auto ms-3 px-4 py-2 bg-main-dominant-red'
                                onClick={handleTransactionClick}
                                id="wholesale"
                            >
                                Wholesale
                            </Button>
                        </Container>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavigationBar