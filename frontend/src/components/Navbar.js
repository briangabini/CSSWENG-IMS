import { Link } from 'react-router-dom'
import Sidebar from './Sidebar.js'
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'

const NavigationBar = () => {

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Sidebar />
                <Navbar.Brand href="/dashboard" className='ms-3'>JPDGarage</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/shopping-cart">Cart</Nav.Link>
                    <Nav.Link href="#link">Justin Depano</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            
        </>
    )
}

export default NavigationBar