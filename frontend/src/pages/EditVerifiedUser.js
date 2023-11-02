import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'

const EditVerifiedUser = () => {

    const handleError = () => {}

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Edit Verified User
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Form>
                        {/* email input */}
                        <FloatingLabel className="mb-2" controlId="floatingInput" label="User Email Address" >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* full name input */}
                        <FloatingLabel className="mb-2" controlId="floatingSelect" label="User Full Name">
                            <Form.Control type="text" placeholder="User Full Name" />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>
                        
                        {/* password input */}
                        <FloatingLabel className="mb-2" controlId="floatingPassword" label="User Given Password">
                            <Form.Control type="text" placeholder="User Given Password" />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* role input */}
                        <FloatingLabel className="mb-5" controlId="floatingSelect" label="User Role/Position">
                            <Form.Select>
                                <option></option>
                                <option value="1">Partsman</option>
                                <option value="2">Secretary</option>
                                <option value="3">Admin</option>
                            </Form.Select>
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* admin password */}
                        {/* for added authentication */}
                        <FloatingLabel className="mb-5" controlId="floatingInput" label="Administrator Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* Button that saves changes of the edited verified user */}
                        <Container fluid className='d-flex justify-content-end pt-5'>
                            <Button className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit">
                                Save changes
                            </Button>
                        </Container>
                    </Form>
                    
                </Card>
            </Row>
        </Container>
    )
}

export default EditVerifiedUser