import { useEffect, useState } from 'react'

// components 
import VerifiedUserDetails from '../components/VerifiedUserDetails'

// bootstrap
import {Container, Row, Col, Card, Dropdown, CardImgOverlay} from 'react-bootstrap'

const VerifiedUsers = () => {
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

        <Container className='border main'>
            <Row className='justify-content-center'>
                <Col className='greeting col-12 border'>Good day, Justin Depano.</Col>
            </Row>
            <Row className='justify-content-center'>
                <Col className='border col-8 '>
                    <Row className='card-title '>
                        <Col className=''>Revenue</Col>
                    </Row>
                    <Row>
                        <Card className='main-dominant-red px-4 py-2 overlay'>
                            <Row>
                                <Dropdown className='d-flex justify-content-end' variant='secondary'>
                                    <Dropdown.Toggle id="dropdown-basic" >
                                        Month
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Day</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Month</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Year</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Row>
                            <Row>
                                <Col className='revenue-amt'>₱5,105,811.99</Col>
                            </Row>
                            <Row>
                                <Card className='w-auto'>
                                    +28%
                                </Card>
                            </Row>
                        </Card>
                    </Row>
                </Col>

                <Col className='border col-4'>
                    <Row className='card-title'>
                        <Col className='ms-4'>Item of the Month</Col>
                    </Row>
                    <Row>
                        <Card className='main-dominant-red w-auto mx-4 p-4' >
                            
                        </Card>
                    </Row>
                </Col>
            </Row>
            
            <Row className='justify-content-center'>
                <Col className='border col-4'>
                    <Row className='card-title'>
                        <Col className=''>Upcoming Reminder</Col>
                    </Row>
                    <Row>
                        <Card className='main-dominant-red w-auto '>
                            <Card.Body>
                                <Card.Title>September 20</Card.Title>
                                <Card.Subtitle>Saturday</Card.Subtitle>
                                <Card.Text>Send payment to Arai helmet suppliers</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>

                <Col className='border col-8'>
                    <Row className='card-title'>
                        <Col className=''>Statistics</Col>
                    </Row>
                    <Row>
                        <Col className='border'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>5</Card.Title>
                                    <Card.Subtitle>Itmes in Cart</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='border'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>3</Card.Title>
                                    <Card.Subtitle>Weekly Payments Due</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='border'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>6</Card.Title>
                                    <Card.Subtitle>Low-Stock Items</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default VerifiedUsers