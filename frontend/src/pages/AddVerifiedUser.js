import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import { useState } from 'react'
import { DOMAIN } from '../config'

const AddVerifiedUser = () => {
    // email, password, employeename, role

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')

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

    const handleError = () => {}

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
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* full name input */}
                        <FloatingLabel className="mb-2" controlId="floatingSelect" label="User Full Name">
                            <Form.Control
                                type="text"
                                placeholder="User Full Name"
                                onChange={(e) => setEmployeeName(e.target.value)}
                                value={employeeName}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* password input */}
                        <FloatingLabel className="mb-2" controlId="floatingPassword" label="User Given Password">
                            <Form.Control
                                type="text"
                                placeholder="User Given Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* role input */}
                        <FloatingLabel className="mb-5" controlId="floatingSelect" label="User Role/Position">
                            <Form.Select
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            >
                                <option></option>
                                <option value="Partsman">Partsman</option>
                                <option value="Secretary">Secretary</option>
                                <option value="Admin">Admin</option>
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