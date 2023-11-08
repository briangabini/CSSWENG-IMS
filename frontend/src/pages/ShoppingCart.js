import { Container, Row, Col, Card } from 'react-bootstrap'

const ShoppingCart = () => {

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Check Out
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Row>
                        <Col className='col-6 border'>
                            inventory + add items here + navigation tools (this is ez just copy paste eh)
                        </Col>
                        <Col className='col-6 border'>
                            remove from cart + purchase confirmation
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    )
}

export default ShoppingCart