import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import { useState } from 'react'
import validator from 'validator'
// const validator = require('validator')

import { DOMAIN } from '../config'

const AddInventoryItems = () => {

    /* STATE VARIABLES FOR INVENTORY ITEM DATA */
    const [partName, setPartName] = useState('')
    const [brand, setBrand] = useState('')
    const [motorModel, setMotorModel] = useState('')
    const [stockNumber, setStockNumber] = useState('')
    const [retailPrice, setRetailPrice] = useState('')
    const [error, setError] = useState('')

    /* STATE VARIABLES FOR ERROR HANDLING */
    const [partNameError, setPartNameError] = useState('')
    const [brandError, setBrandError] = useState('')
    const [stockNumberError, setStockNumberError] = useState('')
    const [retailPriceError, setRetailPriceError] = useState('')

    /* EVENT LISTENER FUNCTIONS */
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(partName)
        console.log(brand)
        console.log(motorModel)
        console.log(stockNumber)
        console.log(retailPrice)

        let inventoryItem = {}

        if (validator.isEmpty(motorModel)) {
            inventoryItem = { partName, brand, stockNumber, retailPrice }
        } else {

            inventoryItem = { partName, brand, motorModel, stockNumber, retailPrice }
        }

        const response = await fetch(DOMAIN + '/inventory/add-item', {
            method: 'POST',
            body: JSON.stringify(inventoryItem), // convert to json
            headers: {
                'Content-Type': 'application/json'
            }
        })

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

    const handlePartNameInput = async (e) => {
        const value = e.target.value
        let errorString = ""

        // check if the partName value already exist in the database
        try {
            const response = await fetch (DOMAIN + '/inventory/checkPartName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({partName: value}) // when sending values with POST use stringify
            })

            if (response.ok) {
                // Parse the response data
                const data = await response.json() // revert json to object

                if (data.isDuplicate) {
                    errorString += "The part name already exists."
                }
            }

        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
        
        // check if the input field is empty
        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
        }


        /* NEXT TIME A POP UP SHOULD DISPLAY WHETHER TO OVERWRITE THE INVENTORY ITEM IN THE DATABASE WITH THE INPUT OR DISCARD THE NEW ITEM */

        setPartNameError(errorString)
        setPartName(value)

    }

    const handleBrandInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
        }

        setBrandError(errorString)
        setBrand(value)

    }

    const handleStockNumberInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        }

        if (!validator.isInt(value)) {
            if (!validator.isEmpty(errorString))
                errorString += " "

            errorString += "Must be a whole number."
        }

        if (value < 0) {
            if (!validator.isEmpty(errorString))
                errorString += " "

            errorString += "Must be a positive number."
        }

        if (value > 9999999) {
            if (!validator.isEmpty(errorString))
                errorString += " "

            errorString += "Must not exceed 9999999."
        }

        setStockNumberError(errorString)
        setStockNumber(value)
    }

    const handleRetailPriceInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        }

        if (!validator.isCurrency(value, { allow_negatives: false })) {
            if (!validator.isEmpty(errorString))
                errorString += " "

            errorString += "Must be a positive whole number or 2 decimal places."
        }

        if (value > 9999999) {
            if (!validator.isEmpty(errorString))
                errorString += " "

            errorString += "Must not exceed 9999999."
        }

        setRetailPriceError(errorString)
        setRetailPrice(value)
    }

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Add Item
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Form onSubmit={handleSubmit}>
                        {/* part name input */}
                        <FloatingLabel className="mt-2" controlId="floatingInput" label="Item Name" >
                            <Form.Control
                                type="text"
                                placeholder=""
                                // onChange={(e) => setPartName(e.target.value)}
                                onChange={handlePartNameInput}
                                onClick={handlePartNameInput}
                                value={partName}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>

                            <div className="error-partName">
                                {/* insert error for part name */}
                                {partNameError}
                            </div>
                        </div>

                        {/* brand input */}
                        <FloatingLabel className="mt-2" controlId="floatingSelect" label="Item Brand">
                            <Form.Control
                                type="text"
                                placeholder=""
                                onChange={handleBrandInput}
                                onClick={handleBrandInput}
                                value={brand}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>

                            <div className="error-brand">
                                {brandError}
                            </div>

                        </div>

                        {/* motorModel input */}
                        <FloatingLabel className="mt-2" controlId="floatingPassword" label="Compatible Motorcycle Model/s">
                            <Form.Control
                                type="text"
                                placeholder=""
                                onChange={(e) => setMotorModel(e.target.value)}
                                value={motorModel}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>

                        </div>

                        {/* stockNumber input */}
                        <FloatingLabel className="mt-2" controlId="floatingPassword" label="Item Stock Number">
                            <Form.Control
                                type="number"
                                placeholder=""
                                onChange={handleStockNumberInput}
                                onClick={handleStockNumberInput}
                                value={stockNumber}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            <div className="error-stockNumber">
                                {stockNumberError}
                            </div>
                        </div>

                        {/* retail price */}
                        <FloatingLabel className="mt-2" controlId="floatingPassword" label="Item Retail Price (PHP)">
                            <Form.Control
                                type="number"
                                placeholder=""
                                onChange={handleRetailPriceInput}
                                onClick={handleRetailPriceInput}
                                value={retailPrice}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            <div className="error-motorModel">
                                {retailPriceError}
                            </div>
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