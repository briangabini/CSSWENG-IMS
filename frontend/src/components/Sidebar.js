import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Row, Col, Container } from 'react-bootstrap';

function Sidebar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="border mx-2" onClick={handleShow}>
                <p>=</p>
                {/** The "=" MUST BE REPLACED with the actual 3-line icon */}
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Col className='ms-4'>
                        <Row>
                            <Row className='my-3'>
                                {/* Links to the inventory page */}
                                <Link to="/inventory">
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black'>Inventory</ h5>
                                </Link>
                            </Row>
                            
                            <Row className='my-3'>
                                {/* Links to the finance page */}
                                <Link to="/sales-page">
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black'>Finance</ h5>
                                </Link>
                            </Row>

                            <Row className='my-3'>
                                {/* Links to the add item page */}
                                <Link to="/inventory/add-items">
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black'>Add Item</ h5>
                                </Link>
                            </Row>

                            <Row className='my-3'>
                                {/* Links to the check out page */}
                                <Link to="/shopping-cart">
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black'>Check Out</ h5>
                                </Link>
                            </Row>

                            <Row className='my-3'>
                                {/* Links to the shopping cart */}
                                <Link to="/audit-log">
                                    <img src="icon_book_.png"></img>
                                    < h5 className='txt-black'>Audit Log</ h5>
                                </Link>
                            </Row>
                        </Row>

                        {/** ADD IF STATEMENT TO CHECK IF USER IS ADMIN OR NOT */}
                        {/* Links to the login page*/}

                        <Row className='me-2 py-5 px-2'>
                            <Container className='border rounded text-center me-auto py-3'>
                                <Link to="/admin-control-center">
                                    <h5 className='txt-black'>Admin Control Center</ h5>
                                </Link>
                            </Container>
                        </Row>
                    </Col>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;