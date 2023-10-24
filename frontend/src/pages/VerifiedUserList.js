// components 
import { Container, Row, Col, Button, ButtonToolbar, InputGroup, Form, Card } from 'react-bootstrap'
import VerifiedUserDetails from '../components/VerifiedUserDetails'
import { useEffect, useState } from 'react'

const VerifiedUserList = () => {
    const [userDetails, setVerifiedUsers] = useState(null)

    useEffect(() => { 
        const fetchVerifiedUsers = async () => { 
            const response = await fetch('/jpd/users') // retrieves response from server as JSON
            const json = await response.json() // converts the json data into an array of objects

            if (response.ok) {
                setVerifiedUsers(json)
            }
        }

        

        fetchVerifiedUsers()
    }, [])
        
    return (
        // <div className="users">
        //     <h1>THIS IS THE VERIFIED USER LIST</h1>

        //     <div className="verified-users">
        //         {userDetails && userDetails.map((userDetail) => (
        //             <VerifiedUserDetails key={userDetail._id}  userDetail={userDetail} /> 
        //         ))} 
        //     </div>
        // </div>
        <Container className='main border'>
            <Row className='fs-2 fw-bold'>
                Verified User List
            </Row>
            <Row>
                <ButtonToolbar className='border'>
                    <Button variant="light" size='sm' className='my-2 ms-auto me-2 shadow'>Add User</Button>
                    <Button variant="light" size='sm' className='m-2 shadow'>Filter: In Stock</Button>
                    <Button variant="light" size='sm' className='m-2 shadow'>Sort by: Date, new to old</Button>
                </ButtonToolbar>
            </Row>
            <Row>
                <InputGroup className="mb-3 nopadding">
                    <Form.Control
                    placeholder="Search"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                    Search
                    </Button>
                </InputGroup>
            </Row>
            <Row>
                <Card>
                    <Row className='w-100 nopadding' style={{border: "1px solid red"}}>
                        <Col className='txt-gray-text border col-4 fs-6 nopadding'>Employee Name</Col>
                        <Col className='txt-gray-text border col-4 fs-6 nopadding'>Email Address</Col>
                        <Col className='txt-gray-text border col-2 fs-6 nopadding'>Role</Col>
                        <Col className='txt-gray-text border col-2 fs-6 nopadding'>Date Added</Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    )
}  

export default VerifiedUserList