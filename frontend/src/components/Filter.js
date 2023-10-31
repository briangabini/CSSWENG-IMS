import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Container, Form, Row, Col } from 'react-bootstrap';

const Filter = () => {
    return (
        <OverlayTrigger
          trigger="click"
          placement="bottom-end"
          overlay={
            <Popover className='p-2 w-auto'>
                <Container className='m-2'>
                    {/* Filters by motorcycle model */}
                    <Row className='fw-bold'>Motorcycle Model</Row>
                    <Form.Control type="text" className='my-2'/>

                    {/* Filters by brand */}
                    <Row className='fw-bold'>Brand</Row>
                    <Form.Control type="text" className='my-2'/>

                    {/* Filters by price range */}
                    <Row className='fw-bold'>Price Range</Row>
                    {/* The minimum price of the price range */}
                    <Row>Min. Price</Row>
                    <Form.Control type="text" className='my-1 '/>
                    {/* The maximum price of the price range */}
                    <Row>Max. Price</Row>
                    <Form.Control type="text" className='my-1'/>

                    {/* Filters by Stock Status */}
                    <Row className='fw-bold my-2'>Stock Status</Row>
                    <Row>
                        <Form.Check label="In Stock"/>
                        <Form.Check label="Danger Zone"/>
                        <Form.Check label="Out of Stock"/>
                    </Row>
                </Container>
            </Popover>
          }
        >
        <Button variant="light" size='sm' className='rounded-4 px-3 m-2 shadow'>
            {/* The current filter in place */}
            Filter: In Stock
            <img className='ms-2 mb-1' src='icon_sort_.png'></img>
        </Button>
        </OverlayTrigger>
    )
}

export default Filter