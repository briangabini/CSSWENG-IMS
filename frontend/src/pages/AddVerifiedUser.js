import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'

const AddVerifiedUser = () => {

    return (
        <Container className='main'>
        <Row className='fs-2 fw-bold'>
            Add Verified User
        </Row>
        <Row>
            <Card className='p-4 rounded-4 shadow mt-3'>
                <Form>
                    <FloatingLabel className="mb-2" controlId="floatingInput" label="User Email Address" >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>

                    <FloatingLabel className="mb-2" controlId="floatingSelect" label="User Full Name">
                        <Form.Select>
                            <option></option>
                            <option value="1">Juan Dela Cruz</option>
                            <option value="1">Juan Dela Cruz</option>
                            <option value="1">Juan Dela Cruz</option>
                        </Form.Select>
                    </FloatingLabel>
                    
                    <FloatingLabel className="mb-2" controlId="floatingPassword" label="User Given Password">
                        <Form.Control type="text" placeholder="User Given Password" />
                    </FloatingLabel>

                    <FloatingLabel className="mb-5" controlId="floatingSelect" label="User Role/Position">
                        <Form.Select>
                            <option></option>
                            <option value="1">Partsman</option>
                            <option value="2">Secretary</option>
                            <option value="3">Admin</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel className="mb-5" controlId="floatingInput" label="Administrator Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>

                    <Container fluid className='d-flex justify-content-end pt-5'>
                        <Button className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit">
                            Add to Team
                        </Button>
                    </Container>
                </Form>
                
            </Card>
        </Row>
    </Container>
    )
}

export default AddVerifiedUser