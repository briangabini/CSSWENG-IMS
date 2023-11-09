import { Container, Form, Button, FloatingLabel, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const navigateDashboard = () => {
        navigate(`/dashboard`);
    };

    return (
        <Container fluid className='d-flex align-items-end flex-column login'>
            <div className='fs-2 fw-bold w-50 align-self-end mt-auto'>
                Log-in to <span className='txt-JPD-logo-red'>JPD</span>Garage
            </div>
            {/* email input */}
            <FloatingLabel className="mt-2 w-50" 
                            controlId="floatingSelect"
                            label="Email">
                <Form.Control 
                    type="email" 
                    placeholder=""
                />
            </FloatingLabel>
            {/* password input */}
            <InputGroup className="mb-5 mt-2 nopadding w-50">
                <FloatingLabel className="" 
                                controlId="floatingSelect"
                                label="Password">
                    <Form.Control 
                        type="password" 
                        placeholder=""
                    />
                </FloatingLabel>
                <Button id="button-addon2" 
                        variant='light'
                        className='py-2 px-3 border border-start-0 bg-white'>
                    {/* eye open */}
                    <img className='mb-1 me-2' src='eye.svg' alt="Search" />
                    {/* eye close */}
                    {/* <img className='mb-1 me-2' src='eye-slash.svg' alt="Search" /> */}
                </Button>
            </InputGroup>
            <Button className='mb-auto px-4 rounded-4 bg-main-dominant-red border-0' onClick={navigateDashboard}>Login</Button>
        </Container>

    )
}

export default Login