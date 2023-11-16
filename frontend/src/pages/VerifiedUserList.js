// components 
import { Container, Row, Col, Button, ButtonToolbar, InputGroup, Form, Card } from 'react-bootstrap'
import VerifiedUserDetails from '../components/VerifiedUserDetails'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOMAIN } from '../config'
import { useAuthContext } from "../hooks/useAuthContext"

const VerifiedUserList = () => {
    const {user} = useAuthContext()
    const [userDetails, setVerifiedUsers] = useState(null)

    useEffect(() => { 
        const fetchVerifiedUsers = async () => { 
            if (!user) {
                return
            }
            const response = await fetch(DOMAIN + '/users', {
                headers: {'Authorization': `Bearer ${user.token}`},
              }) // retrieves response from server as JSON
            const json = await response.json() // converts the json data into an array of objects

            if (response.ok) {
                setVerifiedUsers(json)
            }
        }
        if (user) {
            fetchVerifiedUsers()
        }
    }, [])

    const navigate = useNavigate();
    const navigateAddUser = () => {
        navigate('/add-verified-user');
    };
    
    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Verified User List
            </Row>
            <Row>
                <ButtonToolbar className='nopadding'>
                    {/* Button to Add a Verified User */}
                    <Button onClick={navigateAddUser} variant="light" size='sm' className='rounded-4 px-3 my-2 ms-auto me-2 shadow'>
                        Add User
                        <img className='ms-2 mb-1' src='icon_plus_.png'></img>
                    </Button>
                    {/* Filters Users */}
                    <Button variant="light" size='sm' className='rounded-4 px-3 m-2 shadow'>
                        Filter: In Stock
                        <img className='ms-2 mb-1' src='icon_sort_.png'></img>
                    </Button>
                    {/* Sorts Users */}
                    <Button variant="light" size='sm' className='rounded-4 px-3 ms-2 my-2 shadow'>
                        Sort by: Date, new to old
                        <img className='ms-2 mb-1' src='icon_sort_.png'></img>
                    </Button>
                </ButtonToolbar>
            </Row>
            <Row>
                <InputGroup className="mb-5 mt-2 nopadding">
                    {/* Search Bar */}
                    <Form.Control placeholder="Search" className='rounded-start-pill ps-4 shadow'/>
                    <Button id="button-addon2" variant="light" className='rounded-end-pill py-2 px-3 shadow'>
                        <img className='mb-1 me-2' src='icon_magnifyingglass_.png' alt="Search" />
                    </Button>
                </InputGroup>
            </Row>
            <Row>
                <Card className='rounded-4 shadow'>
                    {/* Headings for Verified Users */}
                    <Row className='w-100 nopadding my-2'>
                        <Col className='txt-gray-text col-4 fs-6 nopadding'>Employee Name</Col>
                        <Col className='txt-gray-text col-4 fs-6 nopadding'>Email Address</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Role</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Date Added</Col>
                    </Row>
                    {/* Loop for verified users */}
                    {userDetails && userDetails.map((userDetail) => (
                    // component for verified users' details
                    <VerifiedUserDetails key={userDetail._id}  userDetail={userDetail} /> 
                    ))} 
                </Card>
            </Row>
        </Container>
    )
}  

export default VerifiedUserList