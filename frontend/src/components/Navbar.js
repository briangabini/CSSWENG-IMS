import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar.js'
import { Container, Navbar, Nav, NavDropdown, Modal, Button} from 'react-bootstrap'
import { useState } from 'react';

const NavigationBar = () => {

    const navigate = useNavigate();

    const navigateShoppingCart = () => {
        navigate(`/shopping-cart`);
        handleClose();
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Sidebar/>
                <Navbar.Brand href="/dashboard" className='ms-3'>JPDGarage</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                    <Nav.Link href="#link">Justin Depano</Nav.Link>
                    <Nav.Link href='/'><img src='power.svg'></img></Nav.Link>
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
                        <Button className='border-0 ms-auto me-3 px-4 py-2 bg-main-dominant-red'
                                onClick={navigateShoppingCart}>
                                    Retail
                        </Button>
                        <Button className='border-0 me-auto ms-3 px-4 py-2 bg-main-dominant-red'
                                onClick={navigateShoppingCart}>
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