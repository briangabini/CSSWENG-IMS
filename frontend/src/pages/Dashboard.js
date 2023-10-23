import { useEffect, useState } from 'react'

// components 
import VerifiedUserDetails from '../components/VerifiedUserDetails'

// bootstrap
import {Container, Row, Col, Card, Dropdown, DropdownButton, CardGroup, Stack} from 'react-bootstrap'

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

        <Container className='main'>
            <Row className='fs-2 fw-bold col-12'>
                Good day, Justin Depano.
            </Row>

            <Row >
                <Col className='col-8'>
                    <Row className='fw-bold txt-20 my-2'>
                        Revenue
                    </Row>
                    <Row className='me-2'>
                        <Card className='p-4 bg-main-dominant-red overlay-revenue'>
                            <Row>
                                <DropdownButton id="dropdown-item-button" title="Month" align="end"
                                                className='d-flex flex-row-reverse'
                                                variant='light'>
                                    <Dropdown.Item as="button">Day</Dropdown.Item>
                                    <Dropdown.Item as="button">Month</Dropdown.Item>
                                    <Dropdown.Item as="button">Year</Dropdown.Item>
                                </DropdownButton>
                            </Row>
                            <Row>
                                <Col className='m-2 txt-white fs-1 fw-bold'>₱5,105,811.99</Col>
                            </Row>
                            <Row>
                                <Card className='w-auto'>
                                    +28%
                                </Card>
                            </Row>
                        </Card>
                    </Row>
                </Col>

                <Col className='col-4 d-flex flex-column'>
                    <Row className='fw-bold txt-20 my-2'>
                        Item of the Month
                    </Row>
                    <Row className='flex-grow-1'>
                        <Card className='bg-main-dominant-red w-100 p-4' >
                            {/* Content for the Card */}
                        </Card>
                    </Row>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col className='h-100 col-4'>
                    <Row className='fw-bold txt-20 my-2'>
                        Upcoming Reminder
                    </Row>
                    <Row>
                        <Card className='bg-main-dominant-red overlay-reminder w-auto txt-white'>
                            <Card.Body>
                                <Card.Title className='txt-16 fw-bold'>September 20</Card.Title>
                                <Card.Subtitle className='txt-14 '>Saturday</Card.Subtitle>
                                <Card.Text className='txt-20 fw-bold my-4'>Send payment to Arai helmet suppliers</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>

                <Col className='col-8' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Row className='h-auto fw-bold txt-20'>
                        <Col className='my-2'>Statistics</Col>
                    </Row>
                    <Row className='h-auto d-flex align-items-stretch' style={{ flex: 1 }}>
                        <Col className='h-auto'>
                            <Card className='w-auto bg-card1-red overlay-items-in-cart h-100'>
                                <Card.Body>
                                    <Card.Title className='txt-32 fw-bold'>5</Card.Title>
                                    <Card.Subtitle className='txt-14'>Items in Cart</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='h-auto'>
                            <Card className='bg-card2-red overlay-payments-due h-100'>
                                <Card.Body>
                                    <Card.Title className='txt-32 fw-bold'>3</Card.Title>
                                    <Card.Subtitle className='txt-14'>Weekly Payments Due</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='h-auto'>
                            <Card className='bg-main-dominant-red overlay-low-stock h-100'>
                                <Card.Body>
                                    <Card.Title className='txt-32 fw-bold'>6</Card.Title>
                                    <Card.Subtitle className='txt-14'>Low-Stock Items</Card.Subtitle>
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