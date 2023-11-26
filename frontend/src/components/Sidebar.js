import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Row, Col, Container } from 'react-bootstrap';
import { useAuthContext } from "../hooks/useAuthContext"

function Sidebar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user } = useAuthContext()

    const showAdminControl = () => {
        if (user.role === "Admin") {
            return <Row className='me-auto my-4 px-2'>
                <Container className='border rounded text-center me-auto py-3'>
                    <Link to="/admin-control-center" className='link-no-underline'>
                        <h5 className='txt-black py-1'>Admin Control Center</ h5>
                    </Link>
                </Container>
            </Row>
        }
    }
    return (
        <>
            <Button className="border mx-2" onClick={handleShow}>
                <p>=</p>
                {/** The "=" MUST BE REPLACED with the actual 3-line icon */}
            </Button>

            <Offcanvas show={show} onHide={handleClose} className="">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Col className='ms-4'>
                        <Row>
                            <Row className='my-3'>
                                {/* Links to the inventory page */}
                                <Link to="/inventory" className='link-no-underline'>
                                    {/**CURRENT PROBLEM: Text not underlining when being hovered */}
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black py-1'>Inventory</ h5>
                                </Link>
                            </Row>

                            <Row className='my-3'>
                                {/* Links to the finance page */}
                                <Link to="/sales-page" className='link-no-underline'>
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black py-1'>Finance</ h5>
                                </Link>
                            </Row>

                            <Row className='my-3'>
                                {/* Links to the add item page */}
                                <Link to="/inventory/add-items" className='link-no-underline'>
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black py-1'>Add Item</ h5>
                                </Link>
                            </Row>

                            <Row className='my-3'>
                                {/* Links to the check out page */}
                                <Link to="/shopping-cart" className='link-no-underline'>
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black py-1'>Check Out</ h5>
                                </Link>
                            </Row>

                            <Row className='my-3'>
                                {/* Links to the shopping cart */}
                                <Link to="/audit-log" className='link-no-underline'>
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black py-1'>Audit Log</ h5>
                                </Link>
                            </Row>
                        </Row>

                        {showAdminControl()}
                        {/** ADD IF STATEMENT TO CHECK IF USER IS ADMIN OR NOT */}
                        {/* Links to the login page*/}

                        {/* <Row className='me-auto my-4 px-2'>
                            <Container className='border rounded text-center me-auto py-3'>
                                <Link to="/admin-control-center" className='link-no-underline'>
                                    <h5 className='txt-black py-1'>Admin Control Center</ h5>
                                </Link>
                            </Container>
                        </Row> */}
                    </Col>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;