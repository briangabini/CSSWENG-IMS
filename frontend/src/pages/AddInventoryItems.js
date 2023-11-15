import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'

const AddInventoryItems = () => {

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Add Item
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Form>
                        {/* email input */}
                        <FloatingLabel className="mb-2" controlId="floatingInput" label="Item Name" >
                            <Form.Control type="text" placeholder="" />
                        </FloatingLabel>

                        {/* full name input */}
                        <FloatingLabel className="mb-2" controlId="floatingSelect" label="Item Brand">
                            <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                        
                        {/* password input */}
                        <FloatingLabel className="mb-2" controlId="floatingPassword" label="Compatible Motorcycle Model/s">
                            <Form.Control type="text" placeholder="" />
                        </FloatingLabel>

                        {/* role input */}
                        <FloatingLabel className="mb-2" controlId="floatingPassword" label="Item Stock Number">
                            <Form.Control type="number" placeholder="" />
                        </FloatingLabel>

                        {/* admin password */}
                        {/* for added authentication */}
                        <FloatingLabel className="mb-2" controlId="floatingPassword" label="Item Retail Price (PHP)">
                            <Form.Control type="text" placeholder="" />
                        </FloatingLabel>

                        <Container fluid className='d-flex justify-content-end pt-5'>
                            <Button className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit">
                                Add Item
                            </Button>
                        </Container>
                    </Form>
                    
                </Card>
            </Row>
        </Container>
    )
}

export default AddInventoryItems