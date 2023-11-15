// bootstrap
import {Container, Row, Col, Card, Dropdown, DropdownButton, Button, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ReminderAndStatistics from '../components/ReminderAndStatistics'
import {useState, useEffect} from 'react'

const Dashboard = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }

    }, []);

    const navigate = useNavigate();

    const navigateSales = () => {
        navigate(`/sales-page`);
    };

    // Prevents the dropdown button from doing the click event (navigation)
    const handleDropdownClick = (e) => {
        e.stopPropagation();
    }
    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold col-12'>
                Good day, {user.employeeName}.
            </Row>

            <Row className='pe-2'>
                {/* Revenue Section */}
                {/* When this section is clicked, would navigate to Sales page */}
                {
                    user.role === "Admin" && (

                    <Col className='col-8' onClick={navigateSales}>
                        <Row className='fw-bold txt-20 my-2'>
                            Revenue
                        </Row>
                        <Row className='me-2'>
                            <Card className='p-4 bg-main-dominant-red overlay-revenue'>
                                <Row>
                                    {/* Would change the revenue amount depending on the option */}
                                    <Form.Select    size="sm"
                                                    className='w-auto ms-auto fw-bold'
                                                    onClick={handleDropdownClick}>
                                        <option>Day</option>
                                        <option>Month</option>
                                        <option>Year</option>
                                    </Form.Select>
                                </Row>
                                <Row>
                                    {/* The revenue amount of the selected option */}
                                    <Col className='m-2 txt-white fs-1 fw-bold'>₱5,105,811.99</Col>
                                </Row>
                                <Row>
                                    <Button className='rounded-4 w-auto txt-profit-dark fw-bold shadow' 
                                            variant='light'>
                                        <img src='icon_up_.png'></img>
                                        {/* The perecentage of increase/decrese of revenue depending on the option selected */}
                                        +28%
                                    </Button>
                                </Row>
                            </Card>
                        </Row>
                    </Col>
                )}

                {/* A section that needs to be replaced */}
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

            <ReminderAndStatistics />

        </Container>
    )
}

export default Dashboard