import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import { useState } from 'react'
import { DOMAIN } from '../config'
import validator from 'validator'

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

        /* 
         const response = await fetch('/api/workouts', {
         method: 'POST',
          body: JSON.stringify(workout),
         headers: {
           'Content-Type': 'application/json'
      }
    })
    
      const json = await response.json()
        */

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

    const handleEmailInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
        }

        setEmailError(errorString)
        setEmail(value)
    }

    const handlePasswordInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
        }

        setPasswordError(errorString)
        setPassword(value)
    }

    const handleEmployeeNameInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
        }

        setEmployeeNameError(errorString)
        setEmployeeName(value)
    }

    const handleRoleInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
        }

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
                        <FloatingLabel className="mb-2" controlId="floatingInput" label="User Email Address" >
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                onChange={handleEmailInput}
                                value={email}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            {emailError}
                        </div>

                        {/* full name input */}
                        <FloatingLabel className="mb-2" controlId="floatingSelect" label="User Full Name">
                            <Form.Control
                                type="text"
                                placeholder="User Full Name"
                                onChange={handleEmployeeNameInput}
                                value={employeeName}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            {employeeNameError}
                        </div>

                        {/* password input */}
                        <FloatingLabel className="mb-2" controlId="floatingPassword" label="User Given Password">
                            <Form.Control
                                type="text"
                                placeholder="User Given Password"
                                onChange={handlePasswordInput}
                                value={password}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            {passwordError}
                        </div>

                        {/* role input */}
                        <FloatingLabel className="mb-5" controlId="floatingSelect" label="User Role/Position">
                            <Form.Select
                                onChange={handleRoleInput}
                                onClick={handleRoleInput}
                                value={role}
                            >
                                <option></option>
                                <option value="Partsman">Partsman</option>
                                <option value="Secretary">Secretary</option>
                                <option value="Admin">Admin</option>
                            </Form.Select>
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            {roleError}
                        </div>

                        {/* admin password */}
                        {/* for added authentication */}
                        <FloatingLabel className="mb-5" controlId="floatingInput" label="Administrator Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                        </div>

                        {/* Add to Team Button */}
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