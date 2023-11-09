import { Container, Row, Col, Card, InputGroup, Form, Button, FloatingLabel } from 'react-bootstrap'
import Filter from '../components/Filter'
import SortBy from '../components/SortBy'

const ShoppingCart = () => {

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Check Out
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Row>
                        <Col className='col-6 border'>
                            {/* Navigation Tooles: Search + Filter + Sort By */}
                            <Row>
                                {/* Search Bar */}
                                <InputGroup className="mb-5 mt-2 nopadding">
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
                            inventory + add items here + navigation tools (this is ez just copy paste eh)
                        </Col>
                        <Col className='col-6 nomargin nopadding'>
                            <Row className='mb-2 nomargin'>
                                <Col className='col-1'>
                                    <Form.Check
                                        type={'checkbox'}
                                        className='ms-1'
                                    />
                                </Col>
                                <Col className='col-5'>
                                    Name
                                </Col>
                                <Col className='col-2 text-center'>
                                    QTY
                                </Col>
                                <Col className='col-3 ms-3'>
                                    Price
                                </Col>
                            </Row>
                            <div className='items-in-cart '>
                                <Row className='mb-2 nomargin nopadding'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className='ms-1'
                                        />
                                    </Col>
                                    <Col className='col-5 text-wrap'>
                                        Lorem Ipsum Lorem Ipsum..
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-dark" className='nopadding px-2'>-</Button>
                                        <span className='mx-1'> 2 </span>
                                        <Button variant="outline-dark" className='nopadding px-2'>+</Button>
                                    </Col>
                                    <Col className='col-3 text-wrap'>
                                        ₱515.03
                                    </Col>
                                </Row>
                                <Row className='mb-2 nomargin nopadding'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className='ms-1'
                                        />
                                    </Col>
                                    <Col className='col-5 text-wrap'>
                                        Lorem Ipsum Lorem Ipsum..
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-dark" className='nopadding px-2'>-</Button>
                                        <span className='mx-1'> 2 </span>
                                        <Button variant="outline-dark" className='nopadding px-2'>+</Button>
                                    </Col>
                                    <Col className='col-3 text-wrap'>
                                        ₱515.03
                                    </Col>
                                </Row>
                                <Row className='mb-2 nomargin nopadding'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className='ms-1'
                                        />
                                    </Col>
                                    <Col className='col-5 text-wrap'>
                                        Lorem Ipsum Lorem Ipsum..
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-dark" className='nopadding px-2'>-</Button>
                                        <span className='mx-1'> 2 </span>
                                        <Button variant="outline-dark" className='nopadding px-2'>+</Button>
                                    </Col>
                                    <Col className='col-3 text-wrap'>
                                        ₱515.03
                                    </Col>
                                </Row>
                                <Row className='mb-2 nomargin nopadding'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className='ms-1'
                                        />
                                    </Col>
                                    <Col className='col-5 text-wrap'>
                                        Lorem Ipsum Lorem Ipsum..
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-dark" className='nopadding px-2'>-</Button>
                                        <span className='mx-1'> 2 </span>
                                        <Button variant="outline-dark" className='nopadding px-2'>+</Button>
                                    </Col>
                                    <Col className='col-3 text-wrap'>
                                        ₱515.03
                                    </Col>
                                </Row>
                                <Row className='mb-2 nomargin nopadding'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className='ms-1'
                                        />
                                    </Col>
                                    <Col className='col-5 text-wrap'>
                                        Lorem Ipsum Lorem Ipsum..
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-dark" className='nopadding px-2'>-</Button>
                                        <span className='mx-1'> 2 </span>
                                        <Button variant="outline-dark" className='nopadding px-2'>+</Button>
                                    </Col>
                                    <Col className='col-3 text-wrap'>
                                        ₱515.03
                                    </Col>
                                </Row>
                                <Row className='mb-2 nomargin nopadding'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className='ms-1'
                                        />
                                    </Col>
                                    <Col className='col-5 text-wrap'>
                                        Lorem Ipsum Lorem Ipsum..
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-dark" className='nopadding px-2'>-</Button>
                                        <span className='mx-1'> 2 </span>
                                        <Button variant="outline-dark" className='nopadding px-2'>+</Button>
                                    </Col>
                                    <Col className='col-3 text-wrap'>
                                        ₱515.03
                                    </Col>
                                </Row>
                                <Row className='mb-2 nomargin nopadding'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className='ms-1'
                                        />
                                    </Col>
                                    <Col className='col-5 text-wrap'>
                                        Lorem Ipsum Lorem Ipsum..
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-dark" className='nopadding px-2'>-</Button>
                                        <span className='mx-1'> 2 </span>
                                        <Button variant="outline-dark" className='nopadding px-2'>+</Button>
                                    </Col>
                                    <Col className='col-3 text-wrap'>
                                        ₱515.03
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Button className='w-auto px-5 mx-auto mt-4 bg-main-dominant-red shadow border-0'>Delete Items</Button>
                            </Row>
                            <Row>
                                <Card className='w-75 mx-auto'>
                                    <Row className='text-center border'>
                                        <div>
                                            Transaction Type: Retail
                                        </div>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FloatingLabel className="mb-1 w-auto" controlId="floatingSelect" label="Job ID">
                                                <Form.Control type="email"></Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <span className='d-inline'>Total: ₱460.52</span>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className='w-auto px-5 mx-auto mt-4 bg-main-dominant-red shadow border-0'>Cancel Order</Button>
                                </Col>
                                <Col>
                                    <Button className='w-auto px-5 mx-auto mt-4 bg-main-dominant-red shadow border-0'>Confirm Order</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    )
}

export default ShoppingCart