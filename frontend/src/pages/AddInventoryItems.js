import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import validator from 'validator'
import _ from 'lodash'
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

    // for enabling the submit button when there's no error
    const [isValidPartName, setValidPartName] = useState(false)
    const [isValidBrand, setValidBrand] = useState(false)
    const [isValidStockNumber, setValidStockNumber] = useState(false)
    const [isValidRetailPrice, setValidRetailPrice] = useState(false)
    const [isButtonEnabled, setButtonEnabled] = useState(false)

    // enable button when there are no more errors or vice versa
    useEffect(() => {
        console.log('PartName: ', isValidPartName)
        console.log('Brand: ', isValidBrand)
        console.log('Stock Number: ', isValidStockNumber)
        console.log('Retail Price: ', isValidRetailPrice)

        if (isValidPartName && isValidBrand && isValidStockNumber && isValidRetailPrice) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }
    }, [isValidPartName, isValidBrand, isValidStockNumber, isValidRetailPrice])

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

    const debouncedHandlePartNameQuery = _.debounce(async (value, callback) => {
        try {
            const response = await fetch(DOMAIN + '/inventory/checkPartName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ partName: value }) // when sending values with POST use stringify
            });

            if (response.ok) {
                // Parse the response data
                const data = await response.json(); // revert json to object

                if (data.isDuplicate) {
                    callback("The part name already exists.");
                } else {
                    callback(null);
                }
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
            callback("An error occurred while checking the part name.");
        }
    }, 200);
    
    const handlePartNameInput = async (e) => {
        const value = e.target.value;
        let errorString = "";
        let isValid = false

        // check if the input field is empty
        if (validator.isEmpty(value)) {
            errorString += "Must be filled.";
        } else {
            // Call the debounced function and wait for it to finish before setting the state
            debouncedHandlePartNameQuery(value, (duplicateError) => {
                if (duplicateError) {
                    setPartNameError(duplicateError);
                    setValidPartName(isValid)
                } else {
                    isValid = true
                    
                    setPartNameError("");
                    setValidPartName(isValid)
                }
            });
        }
        
        // setValidPartName(isValid)
        setPartNameError(errorString);
        setPartName(value);
    }

    const handleBrandInput = (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = false

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
            isValid = true
        }

        setValidBrand(isValid)
        setBrandError(errorString)
        setBrand(value)
    }


    const handleStockNumberInput = (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = true

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
            isValid = false
        } else {
            if (!validator.isInt(value)) {

                errorString += "Must be a whole number."
                isValid = false
            }
    
            if (value < 0) {

                errorString += "Must be a positive number."
                isValid = false
            }
    
            if (value > 9999999) {
    
                errorString += "Must not exceed 9999999."
                isValid = false
            }
        }


        setValidStockNumber(isValid)
        setStockNumberError(errorString)
        setStockNumber(value)
    }

    const handleRetailPriceInput = (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = true

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
            isValid = false
        } else {
            if (!validator.isCurrency(value, { allow_negatives: false })) {
    
                errorString += "Must be a positive whole number or 2 decimal places."
                isValid = false
            }
    
            if (value > 9999999) {

                errorString += "Must not exceed 9999999."
                isValid = false
            }
        }

        setValidRetailPrice(isValid)
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
                            <Button 
                                className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit"
                                disabled={!isButtonEnabled}
                            >
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