import { Container, Row, Button, Form, Card, FloatingLabel } from 'react-bootstrap'
import { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN } from '../config'

const EditItem = () => {


    const [partName, setPartName] = useState('')
    const [brand, setBrand] = useState('')
    const [motorModel, setMotorModel] = useState('')
    const [stockNumber, setStockNumber] = useState('')
    const [retailPrice, setRetailPrice] = useState('')
    const [error, setError] = useState('')
    const [hasChanged, setHasChangedState] = useState(false)


    const { id } = useParams()

    const [initialValues, setInitialValues] = useState({
        partName: '',
        brand: '',
        motorModel: '',
        stockNumber: '',
        retailPrice: ''
    })
    
    useEffect(() => {
        const changed = partName !== initialValues.partName ||
                        brand !== initialValues.brand ||
                        motorModel !== initialValues.motorModel ||
                        stockNumber !== initialValues.stockNumber ||
                        retailPrice !== initialValues.retailPrice;

        setHasChangedState(changed); // Update the state based on the current values

        // Just for debugging:
        console.log("Current Values:", { partName, brand, motorModel, stockNumber, retailPrice });
        console.log("Initial Values:", initialValues);
        console.log("Changed:", changed);
        console.log("Has changed:", hasChanged);
        
    }, [partName, brand, motorModel, stockNumber, retailPrice, initialValues]);

    

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


        const inventoryItem = { partName, brand, motorModel, stockNumber, retailPrice } 

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

    // do a useEffect to get the 

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
                                onChange={(e) => setPartName(e.target.value)}
                                value={partName}
                                required
                            />
                        </FloatingLabel>

                        {/* brand input */}
                        <FloatingLabel className="mb-2" controlId="partBrandInput" label="Item Brand">
                            <Form.Control
                                type="text"
                                onChange={(e) => setBrand(e.target.value)}
                                value={brand}
                                required
                            />
                        </FloatingLabel>

                        {/* motorModel input */}
                        <FloatingLabel className="mb-2" controlId="partModelInput" label="Compatible Motorcycle Model/s">
                            <Form.Control
                                type="text"
                                onChange={(e) => setMotorModel(e.target.value)}
                                value={motorModel}
                                required
                            />
                        </FloatingLabel>

                        {/* stockNumber input */}
                        <FloatingLabel className="mb-2" controlId="stockNumberInput" label="Item Stock Number">
                            <Form.Control
                                type="number"
                                //Semicolon is required here, it serves as a separator between statements
                                onChange={(e) => setStockNumber(e.target.value ? Number(e.target.value) : "")}
                                value={stockNumber}
                                required
                            />
                        </FloatingLabel>

                        {/* retail price */}
                        <FloatingLabel className="mb-2" controlId="retailPriceInput" label="Item Retail Price (PHP)">
                            <Form.Control
                                type="text"
                                onChange={(e) => setRetailPrice(e.target.value ? Number(e.target.value) : "")}
                                value={retailPrice}
                                required
                            />
                        </FloatingLabel>

                        <Container fluid className='d-flex justify-content-end pt-5'>
                            <Button className='bg-main-dominant-red border border-0 px-4 rounded-4' type="submit" disabled={!hasChanged}>
                                Edit Item
                            </Button>
                        </Container>
                    </Form>

                </Card>
            </Row>
        </Container>
    )
}

export default EditItem