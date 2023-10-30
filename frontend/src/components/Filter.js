import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Container, Form, Row, Col } from 'react-bootstrap';
import {useState, useEffect} from 'react'

const Filter = ({brand, motorModel, stockStatus, onUpdate}) => {
    const [localMotorModel, setLocalMotorModel] = useState(motorModel)
    const [localStockStatus, setLocalStockStatus] = useState(stockStatus)
    const [localBrand, setLocalBrand] = useState(brand)

    useEffect(() => {
        console.log('Updated localMotorModel, localStockStatus: ', localMotorModel, localStockStatus);
        onUpdate(localMotorModel, localStockStatus);
    }, [localMotorModel, localStockStatus]);
    
    let stockStatusArray = []

    const handleUpdate = (event) => {
        let checkboxes = document.querySelectorAll('input[name="stockStatus"]:checked');
        let output = [];
        checkboxes.forEach((checkbox) => {
            output.push(checkbox.value);
        });

        stockStatusArray = output
        const stockStatusQueryString = stockStatusArray.join(',') 

        setLocalStockStatus(stockStatusQueryString)
    }

    return (
        <OverlayTrigger
          trigger="click"
          placement="bottom-end"
          overlay={
            <Popover className='p-2 w-auto'>
                <Container className='m-2'>

                    <Row className='fw-bold'>Motorcycle Model</Row>
                    <Form.Control type="text" className='my-2'/>

                    <Row className='fw-bold'>Brand</Row>
                    <Form.Control type="text" className='my-2'/>

                    <Row className='fw-bold'>Price Range</Row>
                    <Row>Min. Price</Row>

                    <Form.Control type="text" className='my-1 '/>
                    <Row>Max. Price</Row>
                    <Form.Control type="text" className='my-1'/>

                    <Row className='fw-bold my-2'>Stock Status</Row>
                    <Row>
                        <Form.Check 
                            name="stockStatus"
                            type="checkbox"
                            label="In Stock" 
                            value="In Stock"
                            onChange={handleUpdate}
                        />
                        <Form.Check 
                            name="stockStatus"
                            type="checkbox"
                            label="Danger Zone"
                            value="Danger Zone"
                              onChange={handleUpdate}
                        />
                        <Form.Check 
                            name="stockStatus"
                            type="checkbox"
                            label="Out of Stock"
                            value="Out of Stock"
                              onChange={handleUpdate}
                        />
                    </Row> 
                </Container>
            </Popover>
          }
        >
        <Button variant="light" size='sm' className='rounded-4 px-3 m-2 shadow'>
            Filter: In Stock
            <img className='ms-2 mb-1' src='icon_sort_.png'></img>
        </Button>
        </OverlayTrigger>
    )
}

export default Filter