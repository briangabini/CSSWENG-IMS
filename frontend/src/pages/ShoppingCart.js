import { Container, Row, Col, Card, InputGroup, Form, Button, FloatingLabel, Modal } from 'react-bootstrap'
import Filter from '../components/Filter'
import SortBy from '../components/SortBy'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


const ShoppingCart = () => {
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
            <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Check Out
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Row>
                        <Col className='col-6 px-4'>
                            {/* Navigation Tooles: Search + Filter + Sort By */}
                            <Row>
                                {/* Search Bar */}
                                <InputGroup className="mb-3 mt-2 nopadding">
                                    <Form.Control placeholder="Search" 
                                                    className='rounded-start-2 ps-4 py-2 bg-search-gray'/>
                                    <Button id="button-addon2" 
                                                    variant='light'
                                                    className='py-2 px-3 border border-start-0 bg-search-gray'>
                                        <img className='mb-1 me-2' src='icon_magnifyingglass_.png' alt="Search" />
                                    </Button>
                                </InputGroup>
                            </Row>
                            {/* <Row>
                                <Filter />
                                <SortBy />
                            </Row> */}
                            <Row className='cart-inventory'>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='bg-main-dominant-red p-3 mb-2 rounded-4 height-content'>
                                    <Row>
                                        <Col className='col-10'>
                                            <Row className='fs-4 fw-bold txt-white ms-2'>
                                                Item Name
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Price: ₱1,753.49
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Brand: Lorem Ipsum
                                            </Row>
                                            <Row className='fs-6 txt-white ms-2'>
                                                Stock: 40 left
                                            </Row>
                                        </Col>
                                        <Col className='col-2'>
                                            <Button className='bg-white txt-main-dominant-red fw-bold border-0'>
                                                +
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Row>
                        </Col>
                        <Col className='col-6 nomargin nopadding scroll-space'>
                            <Row className='mb-4'>
                                <Button className='w-auto ms-auto me-4 bg-main-dominant-red border-0'
                                        size='sm'
                                        onClick={handleShow}>
                                            Choose New Transaction Type
                                </Button>
                            </Row>
                            <Row className='mb-2'>
                                <Col className='col-1'>
                                    <Form.Check
                                        type={'checkbox'}
                                        className=''
                                    />
                                </Col>
                                <Col className='col-4'>
                                    Name
                                </Col>
                                <Col className='col-3 nopadding'>
                                    QTY
                                </Col>
                                <Col className='col-3 nopadding ms-2'>
                                    Price
                                </Col>
                            </Row>
                                <Container fluid className='nopadding'>
                                    <div className='items-in-cart'>
                                        <Row fluid className='mb-2'>
                                            <Col className='col-1'>
                                                <Form.Check
                                                    type={'checkbox'}
                                                    className=''
                                                />
                                            </Col>
                                            <Col className='col-4 text-wrap'>
                                                Lorem Ipsum Lorem Ipsum..
                                            </Col>
                                            <Col className='col-3 nopadding d-flex justify-content-center'>
                                                <Button variant="outline-dark" className='nopadding px-2 my-2'>-</Button>
                                                <span className='mx-auto my-2'> 10000 </span>
                                                <Button variant="outline-dark" className='nopadding px-2 my-2'>+</Button>
                                            </Col>
                                            <Col className='col-3 text-wrap ps-2 nopadding ms-1'>
                                                ₱515.03
                                            </Col>
                                        </Row>
                                        <Row fluid className='mb-2'>
                                            <Col className='col-1'>
                                                <Form.Check
                                                    type={'checkbox'}
                                                    className=''
                                                />
                                            </Col>
                                            <Col className='col-4 text-wrap'>
                                                Lorem Ipsum Lorem Ipsum..
                                            </Col>
                                            <Col className='col-3 nopadding d-flex justify-content-center'>
                                                <Button variant="outline-dark" className='nopadding px-2 my-2'>-</Button>
                                                <span className='mx-auto my-2'> 4 </span>
                                                <Button variant="outline-dark" className='nopadding px-2 my-2'>+</Button>
                                            </Col>
                                            <Col className='col-3 text-wrap ps-2 nopadding ms-1'>
                                                ₱515.03
                                            </Col>
                                        </Row>
                                    </div>
                                </Container>
                            <Row>
                                <Button className='w-auto px-5 mx-auto mt-4 bg-main-dominant-red shadow border-0 mb-4'>Delete Items</Button>
                            </Row>
                            <Row>
                                <Card className='w-75 mx-auto'>
                                    <Row className='fs-5 fw-bold ps-2 pt-2'>
                                        Transaction Type: Retail
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col className=''>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Job ID"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                        </Col>
                                        <Col className='ps-2 nopadding'>
                                            <span className='d-inline fs-5 fw-bold text-wrap'>Total: ₱46000.52</span>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                            <Container className='w-100'>
                                    <Button className='w-auto px-5 ms-auto me-1 mt-4 bg-main-dominant-red shadow border-0'>Cancel Order</Button>
                                    <Button className='w-auto px-5 me-auto ms-1 mt-4 bg-main-dominant-red shadow border-0'>Confirm Order</Button>
                            </Container>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <Container className='text-center fs-2 fw-bold'>
                *Choose Type of Transaction:
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
        <Modal.Footer>
            <p>*Choosing a new transaction type would delete all items and clear the Job Id</p>
        </Modal.Footer>
        </Modal>
        </>
    )
}

export default ShoppingCart