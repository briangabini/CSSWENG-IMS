import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN } from '../config'
import validator from 'validator'
import _ from 'lodash'

const EditItem = () => {

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

    // for allowing the button to be enabled when a param is changed
    const [initialValues, setInitialValues] = useState({
        partName: '',
        brand: '',
        motorModel: '',
        stockNumber: '',
        retailPrice: ''
    })
    const [hasChanged, setHasChangedState] = useState(false)

    useEffect(() => {
        const changed = partName !== initialValues.partName ||
                        brand !== initialValues.brand ||
                        motorModel !== initialValues.motorModel ||
                        Number(stockNumber) !== initialValues.stockNumber ||
                        Number(retailPrice) !== initialValues.retailPrice;
        setHasChangedState(changed); // Update the state based on the current values

        console.log(partName)
        console.log(brand)
        console.log(stockNumber)
        console.log(retailPrice)
        console.log(hasChanged)
        
    }, [partName, brand, motorModel, stockNumber, retailPrice, initialValues, hasChanged])


    const { id } = useParams()

    // enable button when there are no more errors or vice versa
    useEffect(() => {
        if (isValidPartName && isValidBrand && isValidStockNumber && isValidRetailPrice && hasChanged) {
            setButtonEnabled(true)
            console.log("Is valid: YES")
        } else {
            setButtonEnabled(false)
            console.log("Is valid: NO")
        }
    }, [isValidPartName, isValidBrand, isValidStockNumber, isValidRetailPrice, hasChanged])

    const fetchInventoryItem = async () => {
        const response = await fetch(DOMAIN + `/inventory/${id}`)

        const json = await response.json()

        if (response.ok) {
            setPartName(json.partName)
            setBrand(json.brand)
            setMotorModel(json.motorModel)
            setRetailPrice(json.retailPrice)
            setStockNumber(json.stockNumber)

            setValidPartName(true)
            setValidBrand(true)
            setValidRetailPrice(true)
            setValidStockNumber(true)

            setInitialValues({
                partName: json.partName,
                brand: json.brand,
                motorModel: json.motorModel,
                stockNumber: json.stockNumber,
                retailPrice: json.retailPrice
            })

        } else {
            console.error('Unexpected response:', json)
        }
    }

    useEffect(() => {
        fetchInventoryItem()
    }, [])

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

        const response = await fetch(DOMAIN + `/inventory/edit-item/${id}`, {
            method: 'PATCH',
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
            console.log('inventory item edited:', json) // print to console
            alert('Item successfully edited!')
        }
    }
    const debouncedHandlePartNameQuery = _.debounce(async (partNameValue, brandValue, callback) => {
        try {
            const response = await fetch(DOMAIN + '/inventory/checkPartNameBrand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ partName: partNameValue, brand: brandValue }) // when sending values with POST use stringify
            });

            if (response.ok) {
                // Parse the response data
                const data = await response.json(); // revert json to object

                if (data.isDuplicate) {
                    callback("The part name with this brand exists.");
                } else {
                    callback(null);
                }
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
            callback("An error occurred while checking the part name.");
        }
    }, 100);

    const handlePartNameInput = async (e) => {
        const value = e.target.value;
        let errorString = "";
        let isValid = false
        
        // check if the input field is empty
        if (validator.isEmpty(value)) {
            errorString += "Must be filled.";
        } else {
            // Call the debounced function and wait for it to finish before setting the state
            debouncedHandlePartNameQuery(value, brand, (duplicateError) => {
                if (duplicateError) {
                    setPartNameError(duplicateError);
                    setValidPartName(isValid)
                } else {
                    isValid = true
                    setPartNameError("");
                    setButtonEnabled(true)
                    setValidPartName(isValid)
                }
            });
        }

        setPartNameError(errorString);
        setPartName(value);
    }

    const handleBrandInput = async (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = false
        
        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
            setButtonEnabled(false)
        } else {
            debouncedHandlePartNameQuery(partName, value, (duplicateError) => {
                if(!duplicateError){
                    isValid = true
                    console.log(isValid)
                    console.log(e.target.value)
                    console.log(initialValues.brand)
                    if(isValid && (e.target.value !== initialValues.brand)){
                        setButtonEnabled(true)
                    }   
                    setBrandError("");
                    setValidBrand(isValid)
                }
                if (duplicateError) {
                    setBrandError(duplicateError);
                    setValidBrand(isValid)
                }
            });
        }

        // setValidBrand(isValid)
        setBrandError(errorString)
        setBrand(value)
    }

    const handleStockNumberInput = async (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = true

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
            isValid = false
            setButtonEnabled(false)
        }

        if (!validator.isInt(value)) {
            if (!validator.isEmpty(errorString))
                errorString += " "
                errorString += "Must be a whole number."
                isValid = false
                setButtonEnabled(false)
        }

        if (value < 0) {
            errorString += "Must be a positive number."
            isValid = false
            setButtonEnabled(false)
        }

        if (value > 9999999) {
            errorString += "Must not exceed 9999999."
            isValid = false
            setButtonEnabled(false)
        }

        setValidStockNumber(isValid)
        setStockNumberError(errorString)
        setStockNumber(value)
    }

    const handleRetailPriceInput = async (e) => {
        const value = e.target.value
        let errorString = ""
        let isValid = true
        

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
            isValid = false
            setButtonEnabled(false)
        } else {

            if (!validator.isCurrency(value, { allow_negatives: false })) {
                errorString += "Must be a positive whole number or 2 decimal places."
                isValid = false
                setButtonEnabled(false)
            }

            if (value > 9999999) {
                errorString += "Must not exceed 9999999."
                isValid = false
                setButtonEnabled(false)
            }
    
        }

        setValidRetailPrice(isValid)
        setRetailPriceError(errorString)
        setRetailPrice(value)
    }

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Edit Item
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Form onSubmit={handleSubmit}>
                        {/* part name input */}
                        <FloatingLabel className="mb-1" controlId="partNameInput" label="Item Name" >
                            <Form.Control
                                type="text"
                                onChange={handlePartNameInput}
                                onClick={handlePartNameInput}
                                value={partName}
                                required
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'>
                                {partNameError}
                        </div>

                        {/* brand input */}
                        <FloatingLabel className="mb-1" controlId="partBrandInput" label="Item Brand">
                            <Form.Control
                                type="text"
                                onChange={handleBrandInput}
                                onClick={handleBrandInput}
                                value={brand}
                                required
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'>
                                {brandError}
                        </div>

                        {/* motorModel input */}
                        <FloatingLabel className="mb-1" controlId="partModelInput" label="Compatible Motorcycle Model/s">
                            <Form.Control
                                type="text"
                                onChange={(e) => setMotorModel(e.target.value)}
                                value={motorModel}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'>
                        </div>

                        {/* stockNumber input */}
                        <FloatingLabel className="mb-1" controlId="stockNumberInput" label="Item Stock Number">
                            <Form.Control
                                type="number"
                                //Semicolon is required here, it serves as a separator between statements
                                // onChange={(e) => setStockNumber(e.target.value ? Number(e.target.value) : "")}
                                onChange={handleStockNumberInput}
                                onClick={handleStockNumberInput}
                                value={stockNumber}
                                required
                                min="0"
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'>
                                {stockNumberError}
                        </div>

                        {/* retail price */}
                        <FloatingLabel className="mb-1" controlId="retailPriceInput" label="Item Retail Price (PHP)">
                            <Form.Control
                                type="number"
                                // onChange={(e) => setRetailPrice(e.target.value ? Number(e.target.value) : "")}
                                onChange={handleRetailPriceInput}
                                onClick={handleRetailPriceInput}
                                value={retailPrice}
                                required
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 mb-3 txt-main-dominant-red fst-italic fw-bold'>
                                {retailPriceError}
                        </div>

                        {/* Button to save changes of the edited item */}
                        <Container fluid className='d-flex justify-content-end pt-5'>
                            <Button className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit" disabled={!isButtonEnabled}>
                                Save Changes
                            </Button>
                        </Container>
                    </Form>

                </Card>
            </Row>
        </Container>
    )
}

export default EditItem