import { Container, Row, Col, Button, ButtonToolbar, InputGroup, Form, Card, Image } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import VerifiedUserDetails from '../components/VerifiedUserDetails'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// config files
import { DOMAIN } from '../config'

// components 
import InventoryItemDetails from '../components/InventoryItemDetails'
import Filter from '../components/Filter'
import SortBy from '../components/SortBy'

const Inventory = () => {
    // variables for getting the url string
    // const location = useLocation()
    // const queryString = location.search

    // variables for the inventory items
    const [inventoryItems, setInventoryItems] = useState([])

    // search and filter option variables
    const [searchTerm, setSearchTerm] = useState('')
    // const [page, setPage] = useState(0)                 // for adjusting the page later
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [motorModel, setMotorModel] = useState('')
    const [brand, setBrand] = useState('')
    const [stockStatus, setStockStatus] = useState('')
    const [sortBy, setSortBy] = useState('partName,asc')

    // const []
     
    const fetchInventoryItems = async () => { 
        let endpoint = DOMAIN + '/inventory' + '/?';

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

        if (min) {
            endpoint += `&min=${min}`
        }

        if (max) {
            endpoint += `&max=${max}`
        }

        if (brand) {
            endpoint += `&brand=${brand}`
        }

        console.log(sortBy)
        console.log(endpoint)

        const response = await fetch(endpoint) // retrieves response from server as JSON
        const json = await response.json() // converts the json data into an array of objects

        console.log(json.items)

        // console.log('Is json an array?', Array.isArray(json));
        if (response.ok) {
            setInventoryItems(json.items);  // set state only if it's an array
        } else {
            console.error('Unexpected response: ', json.message);
            setInventoryItems([]);  // clear existing data or handle error appropriately
        }
    }

    useEffect(() => {
        fetchInventoryItems()
    }, [])

    // Handle search term changes
    const handleSearchChange = (event) => {
        // Update the search term state whenever the input value changes
        setSearchTerm(event.target.value);
    };

    /* const handleSearchClick = () => {
        // Trigger the search operation when the button is clicked
        if (searchTerm.trim()) {
            fetchInventoryItems(searchTerm.trim());
        } else {
            // If search term is empty, you might want to fetch the initial data again or handle it differently
            // Here we're just fetching the initial set again
            fetchInventoryItems();
        }
    }; */
    const handleSearchClick = () => {
        fetchInventoryItems()
    }

    const handleSortByUpdate = (newSortByValue) => {
        setSortBy(newSortByValue)
    }

    const handleFilterUpdate = (newMin, newMax, newBrand, newMotorModel, newStockStatus) => {
        setMin(newMin)
        setMax(newMax)
        setBrand(newBrand)
        setMotorModel(newMotorModel)
        setStockStatus(newStockStatus)
    }

    return (
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Inventory
            </Row>
            <Row>
                <ButtonToolbar className='nopadding'>
                    {/* Button to download the csv file of the inventory */}
                    <Button variant="light" size='sm' className='rounded-4 px-3 my-2 ms-auto me-2 shadow'>
                        Download as .csv file
                        <img className='ms-2 mb-1' src='icon_datatransferdownload_.png'></img>
                    </Button>

                    
                    {/* Component for filtering items */}
                    <Filter min={min} max={max} brand={brand} motorModel={motorModel} stockStatus={stockStatus} onUpdate={handleFilterUpdate}/>
                    {/* Component for sorting items */}
                    <SortBy sortBy={sortBy} onUpdate={handleSortByUpdate}/>
                </ButtonToolbar>
            </Row>
            <Row>
                {/* Search Bar */}
                <InputGroup className="mb-5 mt-2 nopadding">
                    <Form.Control placeholder="Search" className='rounded-start-pill ps-4 shadow' value={searchTerm} onChange={handleSearchChange}/>
                    <Button id="button-addon2" variant="light" className='rounded-end-pill py-2 px-3 shadow' onClick={handleSearchClick}>
                        <img className='mb-1 me-2' src='icon_magnifyingglass_.png' alt="Search" />
                    </Button>
                </InputGroup>
            </Row>
            <Row>
                {/* Number of results */}
                <Container className='txt-gray-text fs-6 mb-2 d-flex justify-content-center'>50 of 100 results</Container>
            </Row>
            <Row>
                {/* Pagination */}
                {/* 
                    STYLING OF A PAGE BUTTON/ INACTIVE PAGE: border mx-1 bg-main-dominant-red
                    STYLING OF ACTIVE PAGE: border mx-1 txt-main-dominant-red bg-white
                */}
                <Container className='d-flex justify-content-center mb-3'>
                    {/* Button that would make it go straight to first page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page first bg-main-dominant-red'></Button>
                    {/* Button that would make it go straight to prev page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page left bg-main-dominant-red'></Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 1 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 2 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is active. It would have a style of "border mx-1 txt-main-dominant-red bg-white" */}
                    <Button className='border mx-1 txt-main-dominant-red bg-white'> 3 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 4 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 5 </Button>
                    {/* Button that would make it go straight to next page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page right bg-main-dominant-red'></Button>
                    {/* Button that would make it go straight to last page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page last bg-main-dominant-red'></Button>
                </Container>
            </Row>

            <Row>
                <Card className='rounded-4 shadow'>
                    {/* Headings of the inventory items */}
                    <Row className='w-100 nopadding my-2'>
                        <Col className='txt-gray-text col-3 fs-6 nopadding'>Part Name</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Brand</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Motor model</Col>
                        <Col className='txt-gray-text col-1 fs-6 nopadding'>Stock No.</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Retail Price</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Date Added</Col>
                    </Row>
                    {/* Loop for Individual Inventory Items */}
                    {inventoryItems && inventoryItems.map((inventoryItem) => (
                        // Component for Inventory Items
                       <InventoryItemDetails key={inventoryItem._id} _id={inventoryItem._id} inventoryItem={inventoryItem} /> 
                    ))} 
                </Card>
            </Row>
            <Row>
                {/* Pagination */}
                {/* 
                    STYLING OF A PAGE BUTTON/ INACTIVE PAGE: border mx-1 bg-main-dominant-red
                    STYLING OF ACTIVE PAGE: border mx-1 txt-main-dominant-red bg-white
                */}
                <Container className='d-flex justify-content-center mt-3'>
                    {/* Button that would make it go straight to first page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page first bg-main-dominant-red'></Button>
                    {/* Button that would make it go straight to prev page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page left bg-main-dominant-red'></Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 1 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 2 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is active. It would have a style of "border mx-1 txt-main-dominant-red bg-white" */}
                    <Button className='border mx-1 txt-main-dominant-red bg-white'> 3 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 4 </Button>
                    {/* Button that would make it go certain page */}
                    {/* This page is inactive. It would have a style of "border mx-1 bg-main-dominant-red" */}
                    <Button className='border mx-1 bg-main-dominant-red'> 5 </Button>
                    {/* Button that would make it go straight to next page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page right bg-main-dominant-red'></Button>
                    {/* Button that would make it go straight to last page */}
                    <Button className='border rounded-2 p-3 mx-1 button-page last bg-main-dominant-red'></Button>
                </Container>
            </Row>
            <Row>
                {/* Number of results */}
                <Container className='txt-gray-text fs-6 mt-2 d-flex justify-content-center'>50 of 100 results</Container>
            </Row>
        </Container>
    )
}

export default Inventory