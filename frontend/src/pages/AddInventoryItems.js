import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import {useState} from 'react'
import { DOMAIN } from '../config'

const AddInventoryItems = () => {

    const [partName, setPartName] = useState('')
    const [brand, setBrand] = useState('')
    const [motorModel, setMotorModel] = useState('')
    const [stockNumber, setStockNumber] = useState('')
    const [retailPrice, setRetailPrice] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(partName)
        console.log(brand)
        console.log(motorModel)
        console.log(stockNumber)
        console.log(retailPrice)


        const inventoryItem = { partName, brand, motorModel, stockNumber, retailPrice }

        const response = await fetch(DOMAIN + '/inventory/add-item', {
            method: 'POST',
            body: JSON.stringify(inventoryItem), // convert to json
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
            setPartName('')
            setBrand('')
            setMotorModel('')
            setStockNumber('')
            setRetailPrice('')
            console.log('new inventory added:', json) // print to console
        }
    }
    
    const handleError = () =>{}

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Add Item
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Form onSubmit={handleSubmit}>
                        {/* part name input */}
                        <FloatingLabel className="mb-1" controlId="floatingInput" label="Item Name" >
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                onChange={(e) => setPartName(e.target.value)}
                                value={partName}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* brand input */}
                        <FloatingLabel className="mb-1" controlId="floatingSelect" label="Item Brand">
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                onChange={(e) => setBrand(e.target.value)}
                                value={brand}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* motorModel input */}
                        <FloatingLabel className="mb-1" controlId="floatingPassword" label="Compatible Motorcycle Model/s">
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                onChange={(e) => setMotorModel(e.target.value)}
                                value={motorModel}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* stockNumber input */}
                        <FloatingLabel className="mb-1" controlId="floatingPassword" label="Item Stock Number">
                            <Form.Control 
                                type="number" 
                                placeholder="" 
                                onChange={(e) => setStockNumber(e.target.value)}
                                value={stockNumber}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* retail price */}
                        <FloatingLabel className="mb-1" controlId="floatingPassword" label="Item Retail Price (PHP)">
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                onChange={(e) => setRetailPrice(e.target.value)}
                                value={retailPrice}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'
                            onClick={handleError}>
                            Error: Invalid input!
                        </div>

                        {/* button to add item */}
                        <Container fluid className='d-flex justify-content-end pt-5'>
                            <Button className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit">
                                Add Item
                            </Button>
                        </Container>
                    </Form>
                    
                </Card>
            </Row>
        </Container>
    )
}

export default AddInventoryItems