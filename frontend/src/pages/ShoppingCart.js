import { Container, Row, Col, Card, InputGroup, Form, Button, FloatingLabel, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

// componentes
import Filter from '../components/Filter'
import SortBy from '../components/SortBy'
import CartItemDetails from '../components/CartItemDetails'
import InventoryItemDetails from '../components/InventoryItemDetails';
import { useInventoryContext } from '../hooks/useInventoryContext'
import { useAuthContext } from '../hooks/useAuthContext.js'
import { useTransactionTypeContext } from '../hooks/useTransactionTypeContext'
import { useTransactionType } from '../hooks/useTransactionType.js'
import { DOMAIN } from '../config'

const ShoppingCart = () => {
    const { user } = useAuthContext()

    const [motorModel, setMotorModel] = useState('')
    const [brand, setBrand] = useState('')
    const [stockStatus, setStockStatus] = useState('')
    const [sortBy, setSortBy] = useState('partName,asc')
    const [searchTerm, setSearchTerm] = useState('')
    // const {state} = 

    const { inventoryItems, dispatch } = useInventoryContext()
    const { transactionType } = useTransactionTypeContext()
    const { setRetail, setWholesale } = useTransactionType()

    const navigate = useNavigate();

    const navigateShoppingCart = (e) => {
        navigate(`/shopping-cart`);

        if (e.target.id === 'retail') {
            setRetail()
        } else {
            setWholesale()
        }

        handleClose();
    };

    // console.log(transactionType)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchInventoryItems = async () => {

        console.log(DOMAIN)

        let endpoint = DOMAIN + '/inventory/?'

        if (searchTerm) {
            endpoint += `&search=${searchTerm}`; // using "query" as the query parameter name
        }

        if (motorModel) {
            endpoint += `&motorModel=${motorModel}`
        }

        if (stockStatus) {
            endpoint += `&stockStatus=${stockStatus}`
        }

        if (sortBy) {
            endpoint += `&sort=${sortBy}`
        }

        if (brand) {
            endpoint += `&brand=${brand}`
        }

        console.log(sortBy)
        console.log(endpoint)

        const response = await fetch(endpoint, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        }) // retrieves response from server as JSON
        const json = await response.json() // converts the json data into an array of objects

        console.log(json.items)

        // console.log('Is json an array?', Array.isArray(json));
        if (response.ok) {
            // setInventoryItems(json.items)  // set state only if it's an array
            dispatch({ type: 'SET_INVENTORY_ITEMS', payload: json.items })
        } else {
            console.error('Unexpected response: ', json.message)
            // setInventoryItems([])  // clear existing data or handle error appropriately
        }
    }

    useEffect(() => {
        if (user) {
            fetchInventoryItems()
        }
    }, [])

    return (
        <>
            <Container className='main'>
                <Row className='fs-2 fw-bold'>
                    Check Out
                </Row>
                <Row>
                    <Card className='p-4 rounded-4 shadow mt-3'>
                        <Row>
                            <Col className='col-6 border px-4'>
                                {/* Navigation Tooles: Search + Filter + Sort By */}
                                <Row>
                                    {/* Search Bar */}
                                    <InputGroup className="mb-5 mt-2 nopadding">
                                        <Form.Control placeholder="Search"
                                            className='rounded-start-2 ps-4 py-2 bg-search-gray' />
                                        <Button id="button-addon2"
                                            variant='light'
                                            className='py-2 px-3 border border-start-0 bg-search-gray'>
                                            <img className='mb-1 me-2' src='icon_magnifyingglass_.png' alt="Search" />
                                        </Button>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    {/* INVENTORY ITEM LIST */}
                                    {/*<InventoryItemList inventoryItems={inventoryItems} />*/}
                                    <Card className='rounded-4 shadow'>
                                        {/* Headings of the inventory items */}
                                        <Row className='w-100 nopadding my-2'>
                                            <Col className='txt-black col-3 fs-6 nopadding font-weight-bold'>Part Name</Col>
                                            <Col className='txt-black col-2 fs-6 nopadding'>Brand</Col>
                                            <Col className='txt-black col-2 fs-6 nopadding'>Motor model</Col>
                                            <Col className='txt-black col-1 fs-6 nopadding'>Stock No.</Col>
                                            {/* ^^^ Would it be better to make this stock nalang to avoid space issues?
                                                or do we adjust the spacing of the retail price nalang instead? */}
                                            <Col className='txt-black col-2 fs-6 nopadding'>Price</Col>
                                            <Col className='txt-black col-2 fs-6 nopadding'>Date Added</Col>
                                        </Row>
                                        {/* Loop for Individual Inventory Items */}
                                        {inventoryItems && inventoryItems.map((inventoryItem) => (
                                            // Component for Inventory Items
                                            <InventoryItemDetails key={inventoryItem._id} _id={inventoryItem._id} inventoryItem={inventoryItem} showPrice={transactionType} />
                                        ))}
                                    </Card>
                                </Row>
                                inventory + add items here + navigation tools (this is ez just copy paste eh)
                            </Col>
                            <Col className='col-6 nomargin nopadding scroll-space'>
                                <Row className='mb-4'>
                                    <Button className='w-auto ms-auto me-4 bg-main-dominant-red border-0'
                                        size='sm'
                                        onClick={handleShow}>
                                        Choose New Transaction Type
                                    </Button>
                                </Row>
                                <Row className='mb-2'>
                                    <Col className='col-1'>
                                        <Form.Check
                                            type={'checkbox'}
                                            className=''
                                        />
                                    </Col>
                                    <Col className='col-4'>
                                        Name
                                    </Col>
                                    <Col className='col-3 nopadding'>
                                        QTY
                                    </Col>
                                    <Col className='col-3 nopadding'>
                                        Price
                                    </Col>
                                </Row>
                                <Container fluid className='nopadding'>
                                    <div className='items-in-cart'>
                                        <CartItemDetails />
                                        <CartItemDetails />
                                        <CartItemDetails />
                                        <CartItemDetails />
                                        <CartItemDetails />
                                        <CartItemDetails />
                                        <CartItemDetails />




                                    </div>
                                </Container>
                                <Row>
                                    <Button className='w-auto px-5 mx-auto mt-4 bg-main-dominant-red shadow border-0 mb-4'>Delete Items</Button>
                                </Row>
                                <Row>
                                    <Card className='w-75 mx-auto'>
                                        <Row className='fs-5 fw-bold ps-2 pt-2'>
                                            Transaction Type:{transactionType}
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col className=''>
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="Job ID"
                                                    className="mb-3"
                                                >
                                                    <Form.Control type="text" placeholder="name@example.com" />
                                                </FloatingLabel>
                                            </Col>
                                            <Col className='ps-2 nopadding'>
                                                <span className='d-inline fs-5 fw-bold text-wrap'>Total: ₱46000.52</span>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                                <Container className='w-100'>
                                    <Button className='w-auto px-5 ms-auto me-1 mt-4 bg-main-dominant-red shadow border-0'>Cancel Order</Button>
                                    <Button className='w-auto px-5 me-auto ms-1 mt-4 bg-main-dominant-red shadow border-0'>Confirm Order</Button>
                                </Container>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Container className='text-center fs-2 fw-bold'>
                        *Choose Type of Transaction:
                        <Container className='d- mt-4'>
                            {/* button for selecting retail price */}
                            <Button
                                className='border-0 ms-auto me-3 px-4 py-2 bg-main-dominant-red'
                                onClick={navigateShoppingCart}
                                id="retail"
                            >
                                Retail
                            </Button>

                            {/* button for selecting wholesale price */}
                            <Button
                                className='border-0 me-auto ms-3 px-4 py-2 bg-main-dominant-red'
                                onClick={navigateShoppingCart}
                                id="wholesale"
                            >
                                Wholesale
                            </Button>
                        </Container>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <p>*Choosing a new transaction type would delete all items and clear the Job Id</p>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShoppingCart