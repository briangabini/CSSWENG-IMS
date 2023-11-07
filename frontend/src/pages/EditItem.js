import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN } from '../config'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'

const EditItem = () => {

    const navigate = useNavigate();

    const navigateInventory = () => {
        navigate(`/inventory`);
    };
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
    const [hasChanged, setHasChangedState] = useState(false)

    const { id } = useParams()

    const [initialValues, setInitialValues] = useState({
        partName: '',
        brand: '',
        motorModel: '',
        stockNumber: '',
        retailPrice: ''
    })


    // Check if any of the input fields have changed in value from their original
    useEffect(() => {
        const changed = partName !== initialValues.partName ||
            brand !== initialValues.brand ||
            motorModel !== initialValues.motorModel ||
            Number(stockNumber) !== initialValues.stockNumber ||
            Number(retailPrice) !== initialValues.retailPrice;

        setHasChangedState(changed); // Update the state based on the current values

        // Just for debugging:
        console.log("Current Values:", { partName, brand, motorModel, stockNumber, retailPrice });
        console.log("Initial Values:", initialValues);
        console.log("Changed:", changed);
        console.log("Has changed:", hasChanged);

    }, [partName, brand, motorModel, stockNumber, retailPrice, initialValues, hasChanged]);



    const fetchInventoryItem = async () => {
        const response = await fetch(DOMAIN + `/inventory/${id}`)

        const json = await response.json()

        if (response.ok) {
            setPartName(json.partName)
            setBrand(json.brand)
            setMotorModel(json.motorModel)
            setRetailPrice(json.retailPrice)
            setStockNumber(json.stockNumber)

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

    const handlePartNameInput = (e) => {
        const value = e.target.value
        let errorString = ""

        if (validator.isEmpty(value)) {
            errorString += "Must be filled."
        } else {
            errorString = ""
        }

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
                Edit Item
            </Row>
            <Row>
                <Card className='p-4 rounded-4 shadow mt-3'>
                    <Form onSubmit={handleSubmit}>
                        {/* part name input */}
                        <FloatingLabel className="mb-2" controlId="partNameInput" label="Item Name" >
                            <Form.Control
                                type="text"
                                onChange={handlePartNameInput}
                                value={partName}
                                required
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
                        <FloatingLabel className="mb-2" controlId="partBrandInput" label="Item Brand">
                            <Form.Control
                                type="text"
                                onChange={handleBrandInput}
                                value={brand}
                                required
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>

                            <div className="error-brand">
                                {brandError}
                            </div>

                        </div>

                        {/* motorModel input */}
                        <FloatingLabel className="mb-2" controlId="partModelInput" label="Compatible Motorcycle Model/s">
                            <Form.Control
                                type="text"
                                onChange={(e) => setMotorModel(e.target.value)}
                                value={motorModel}
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>

                        </div>

                        {/* stockNumber input */}
                        <FloatingLabel className="mb-2" controlId="stockNumberInput" label="Item Stock Number">
                            <Form.Control
                                type="number"
                                //Semicolon is required here, it serves as a separator between statements
                                // onChange={(e) => setStockNumber(e.target.value ? Number(e.target.value) : "")}
                                onChange={handleStockNumberInput}
                                value={stockNumber}
                                required
                                min="0"
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            <div className="error-stockNumber">
                                {stockNumberError}
                            </div>
                        </div>

                        {/* retail price */}
                        <FloatingLabel className="mb-2" controlId="retailPriceInput" label="Item Retail Price (PHP)">
                            <Form.Control
                                type="number"
                                // onChange={(e) => setRetailPrice(e.target.value ? Number(e.target.value) : "")}
                                onChange={handleRetailPriceInput}
                                value={retailPrice}
                                required
                            />
                        </FloatingLabel>
                        {/* Error */}
                        <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'>
                            <div className="error-motorModel">
                                {retailPriceError}
                            </div>
                        </div>

                        {/* Button to save changes of the edited item */}
                        <Container fluid className='d-flex justify-content-end pt-5'>
                            <Button className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit" disabled={!hasChanged}>
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