import { Container, Form, Button, FloatingLabel, InputGroup } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { DOMAIN } from '../config'
import {useLogin} from '../hooks/useLogin'

const Login = () => {

    /* STATE VARIABLES FOR USER DATA */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    // const [error, setError] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }   

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible) // toggle the boolean value
    }
    

    return (
        <Container fluid className='d-flex align-items-end flex-column login'>
            <div className='fs-2 fw-bold w-50 align-self-end mt-auto'>
                Log-in to <span className='txt-JPD-logo-red'>JPD</span>Garage
            </div>

            <span>{DOMAIN}</span>

            {/* <Form onSubmit={handleSubmit}> */}
                {/* email input */}
                <FloatingLabel className="mt-2 w-50"
                    controlId="floatingSelect"
                    label="Email">
                    <Form.Control
                        type="email"
                        placeholder=""
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </FloatingLabel>
                {/* password input */}
                <InputGroup className="mb-5 mt-2 nopadding w-50">
                    <FloatingLabel className=""
                        controlId="floatingSelect"
                        label="Password">
                        <Form.Control
                            type={isPasswordVisible ? "text" : "password"}
                            id="password"
                            placeholder=""
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            display="none"
                            
                        />
                    </FloatingLabel>
                    <Button id="button-addon2"
                        variant='light'
                        className='py-2 px-3 border border-start-0 bg-white'
                        onClick={togglePasswordVisibility}
                    >
                        {isPasswordVisible ? 
                            // eye close 
                            <img className='mb-1 me-2' src='eye-slash.svg' alt="Search"/> :
                            // eye open 
                            <img className='mb-1 me-2' src='eye.svg' alt="Search" />  
                        }
                    </Button>
                </InputGroup>

                {/* place error here */}
                {/* Error */}
                <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'>
                    {error}
                </div>

                <Button 
                    disabled={isLoading}
                    className='mb-auto px-4 rounded-4 bg-main-dominant-red border-0' 
                    type="button" 
                    onClick={handleSubmit}
                >Login
                </Button>
            {/* </Form> */}
        </Container>

    )
}

export default Login