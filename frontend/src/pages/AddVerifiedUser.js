import { Container, Row, Button, Form, Card, FloatingLabel, InputGroup } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { DOMAIN } from '../config'
import validator from 'validator'

import _ from 'lodash'

const AddVerifiedUser = () => {
    // email, password, employeename, role

    /* STATE VARIABLES FOR USER DATA */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')

    /* STATE VARIABLES FOR ERROR HANDLING */
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [employeeNameError, setEmployeeNameError] = useState('')
    const [roleError, setRoleError] = useState('')

    // for enabling the submit button when there's no error
    const [isValidEmail, setValidEmail] = useState(false)
    const [isValidPassword, setValidPassword] = useState(false)
    const [isValidEmployeeName, setValidEmployeeName] = useState(false)
    const [isValidRole, setValidRole] = useState(false)
    const [isButtonEnabled, setButtonEnabled] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email)
        console.log(password)
        console.log(employeeName)
        console.log(role)


        const user = { email, password, employeeName, role }

        const response = await fetch(DOMAIN + '/users/add-user', {
            method: 'POST',
            body: JSON.stringify(user), // convert to json
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setEmail('')
            setPassword('')
            setEmployeeName('')
            setRole('')
            console.log('new user added:', json) // print to console
        }
    }

    // enable button when there are no more errors or vice versa
    useEffect(() => {
        if (isValidEmail && isValidPassword && isValidEmployeeName && isValidRole) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }
    }, [isValidEmail, isValidPassword, isValidEmployeeName, isValidRole])

    const debouncedHandleEmailQuery = _.debounce(async (value, callback) => {
        try {
            const response = await fetch(DOMAIN + '/users/checkEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: value }) // when sending values with POST use stringify
            });

            if (response.ok) {
                // Parse the response data
                const data = await response.json(); // revert json to object

                if (data.isDuplicate) {
                    callback("The email already exists.");
                } else {
                    callback(null);
                }
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
            callback("An error occurred while checking the email.");
        }
    }, 200);

    const handleEmailInput = (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = false

        if (validator.isEmpty(value)) {
            errorString += "Must be filled.\n"
        } else if (validator.isEmail(value)) {
            errorString += ""
            isValid = true

            // Call the debounced function and wait for it to finish before setting the state
            debouncedHandleEmailQuery(value, (duplicateError) => {
                if (duplicateError) {
                    setEmailError(duplicateError)
                    setValidEmail(isValid)
                } else {
                    isValid = true
                    setValidEmail(isValid)
                    setEmailError("")
                }
            });
        } else {
            errorString += "Must be a valid email.\n"
        }

        // setValidEmail(isValid)
        setEmailError(errorString)
        setEmail(value)
    }

    const handlePasswordInput = (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = false

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
            isValid = true
        }

        setValidPassword(isValid)
        setPasswordError(errorString)
        setPassword(value)
    }

    const handleEmployeeNameInput = (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = false

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
            isValid = true
        }

        setValidEmployeeName(isValid)
        setEmployeeNameError(errorString)
        setEmployeeName(value)
    }

    const handleRoleInput = (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = false

        if (validator.isEmpty(value)) {
            errorString += "No role selected."
        } else {
            errorString = ""
            isValid = true
        }

        setValidRole(isValid)
        setRoleError(errorString)
        setRole(value)
    }

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Add Verified User
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Form onSubmit={handleSubmit}>
                        {/* email input */}
                        <FloatingLabel className="mb-1" controlId="floatingInput" label="User Email Address" >
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                onChange={handleEmailInput}
                                onClick={handleEmailInput}
                                value={email}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            {emailError}
                        </div>

                        {/* full name input */}
                        <FloatingLabel className="mb-1" controlId="floatingSelect" label="User Full Name">
                            <Form.Control
                                type="text"
                                placeholder="User Full Name"
                                onChange={handleEmployeeNameInput}
                                onClick={handleEmployeeNameInput}
                                value={employeeName}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            {employeeNameError}
                        </div>

                        {/* password input */}
                        <InputGroup className="mb-1 nopadding">
                            <FloatingLabel className="" 
                                            controlId="floatingSelect"
                                            label="Password">
                                <Form.Control 
                                    type="password" 
                                    placeholder=""
                                onChange={handlePasswordInput}
                                onClick={handlePasswordInput}
                                value={password}
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
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            {passwordError}
                        </div>

                        {/* role input */}
                        <FloatingLabel className="mb-1" controlId="floatingSelect" label="User Role/Position">
                            <Form.Select
                                onChange={handleRoleInput}
                                onClick={handleRoleInput}
                                value={role}
                            >
                                <option disabled selected value=""> -- select an option -- </option>
                                <option value="Partsman">Partsman</option>
                                <option value="Secretary">Secretary</option>
                                <option value="Admin">Admin</option>
                            </Form.Select>
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            {roleError}
                        </div>

                        {/* admin password */}
                        {/* for added authentication */}
                        <InputGroup className="mb-1 nopadding">
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
                                <img className='mb-1 me-2' src='eye.svg' alt="Password" />
                                {/* eye close */}
                                {/* <img className='mb-1 me-2' src='eye-slash.svg' alt="Password" /> */}
                            </Button>
                        </InputGroup>
                        {/* Error */}
                        {/* TODO: implement next time */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                        </div>

                        {/* Add to Team Button */}
                        <Container fluid className='d-flex justify-content-end pt-5'>
                            <Button
                                className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit"
                                disabled={!isButtonEnabled}
                            >
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