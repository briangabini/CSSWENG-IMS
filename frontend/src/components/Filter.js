import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Container, Form, Row, Col } from 'react-bootstrap';
import {useState, useEffect} from 'react'

const Filter = ({min, max, brand, motorModel, stockStatus, onUpdate}) => {
    const [localMin, setLocalMin] = useState(min)                         // Number
    const [localMax, setLocalMax] = useState(max)                         // Number
    const [localBrand, setLocalBrand] = useState(brand)                   // string
    const [localMotorModel, setLocalMotorModel] = useState(motorModel)    // string
    const [localStockStatus, setLocalStockStatus] = useState(stockStatus) // string

    useEffect(() => {
        // console.log('Updated localMotorModel, localStockStatus: ', localMotorModel, localStockStatus)
        onUpdate(localMin, localMax, localBrand, localMotorModel, localStockStatus)

        // returns the index
        console.log('is Out of Stock: ', localStockStatus.search("Out of Stock"))
        console.log('is Danger Zone: ', localStockStatus.search("Danger Zone"))
        console.log('is In Stock: ', localStockStatus.search("In Stock"))

    }, [localMin, localMax, localBrand, localMotorModel, localStockStatus]);
    
    // event listeners for the input fields

    const handleBrandUpdate = (event) => {
        const newBrand = event.target.value
        setLocalBrand(newBrand)
    }

    const handleMotorModelUpdate = (event) => {
        const newMotorModel = event.target.value
        setLocalMotorModel(newMotorModel)
    }

    const handleStockStatusUpdate = (event) => {
        // get all checked stock status options
        let checkboxes = document.querySelectorAll('input[name="stockStatus"]:checked') 
        let output = [] // place 'checked' stock status here as string

        checkboxes.forEach((checkbox) => {
            output.push(checkbox.value)
        })

        // convert the array to string
        const queryString = output.join(',')

        setLocalStockStatus(queryString)
    }

    return (
        <OverlayTrigger
          trigger="click"
          placement="bottom-end"
          overlay={
            <Popover className='p-2 w-auto'>
                <Container className='m-2'>
                    {/* Filters by motorcycle model */}
                    <Row className='fw-bold'>Motorcycle Model</Row>
                    <Form.Control 
                        type="text" 
                        className='my-2'
                        value={localMotorModel}
                        onChange={handleMotorModelUpdate}
                    />

                    <Row className='fw-bold'>Brand</Row>
                    <Form.Control 
                        type="text" 
                        className='my-2'
                        value={localBrand}
                        onChange={handleBrandUpdate}
                    />

                    <Row className='fw-bold my-2'>Stock Status</Row>
                    <Row>
                        <Form.Check 
                            id="cb1"
                            name="stockStatus"
                            type="checkbox"
                            label="In Stock" 
                            value="In Stock"
                            onChange={handleStockStatusUpdate}
                            checked={localStockStatus.search("In Stock") !== -1}
                        />
                        <Form.Check 
                            id="cb2"
                            name="stockStatus"
                            type="checkbox"
                            label="Danger Zone"
                            value="Danger Zone"
                            onChange={handleStockStatusUpdate}
                            checked={localStockStatus.search("Danger Zone") !== -1}
                        />
                        <Form.Check 
                            id="cb3"
                            name="stockStatus"
                            type="checkbox"
                            label="Out of Stock"
                            value="Out of Stock"
                            onChange={handleStockStatusUpdate}
                            checked={localStockStatus.search("Out of Stock") !== -1}
                        />
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