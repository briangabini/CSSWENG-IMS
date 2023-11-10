import { Link } from 'react-router-dom'
import Sidebar from './Sidebar.js'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


import { useState, useEffect } from 'react'
import { useLogout } from '../hooks/useLogout.js'
import {useAuthContext} from '../hooks/useAuthContext.js'

const NavigationBar = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
        navigateLogin()
    }

    const navigate = useNavigate();

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
                            <Nav.Link href="/shopping-cart">Cart</Nav.Link>
                            <Nav.Link href="#link">{user && user.employeeName}</Nav.Link>

                            {/* FOR TESTING - LOGOUT BUTTON */}
                            { user && (
                                    <div>
                                        <button onClick={handleClick}>
                                            Logout
                                        </button>
                                    </div>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NavigationBar