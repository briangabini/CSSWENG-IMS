import { Container, Row, Col, Button, ButtonToolbar, InputGroup, Form, Card } from 'react-bootstrap'
// import { Modal } from 'react-bootstrap'
// import VerifiedUserDetails from '../components/VerifiedUserDetails'
import { useEffect, useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";

// config files
import { DOMAIN } from '../config'

// delay function call until a specific time set by developer
import _ from 'lodash'

// components 
import Filter from '../components/Filter'
import SortBy from '../components/SortBy'
import PaginationButtons from '../components/PaginationButtons'
import InventoryItemList from '../components/InventoryItemList'
import InventoryItemDetails from '../components/InventoryItemDetails';

import { useInventoryContext } from '../hooks/useInventoryContext'
import { useAuthContext } from '../hooks/useAuthContext.js'

const Inventory = () => {
    /* VARIABLES */
    // variables for the inventory items
    // const [inventoryItems, setInventoryItems] = useState([]) 

    const { user } = useAuthContext()

    // replace inventoryItems state with the useInventoryContext hook
    // destructure the return value of useInventoryContext hook {state, dispatch}
    const { inventoryItems, dispatch } = useInventoryContext()


    const [allInventoryItems, setAllInventoryItems] = useState([])
    const [dataFetched, setDataFetched] = useState(false)

    // search and filter option variables
    const [searchTerm, setSearchTerm] = useState('')
    // const [page, setPage] = useState(0)                  // for adjusting the page later
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [motorModel, setMotorModel] = useState('')
    const [brand, setBrand] = useState('')
    const [stockStatus, setStockStatus] = useState('')
    const [sortBy, setSortBy] = useState('partName,asc')

    // for pagination 
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(total / 50);               // get the total pages

    /* FOR CSV PRINTING */
    const headers = [
        { label: 'Part Name', key: 'partName' },
        { label: 'Brand', key: 'brand' },
        { label: 'Motorcycle Model', key: 'motorModel' },
        { label: 'Stock Number/Quantity', key: 'stockNumber' },
        { label: 'Retail Price', key: 'retailPrice' },
    ]

    /* FUNCTIONS */
    const fetchAllInventoryItems = async () => {

        // var start = Date.now();
        if (!user) {
            return
        }

        try {
            const response = await fetch(DOMAIN + '/inventory/print-csv', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })

            if (response.ok) {
                const data = await response.json();
                setAllInventoryItems(data);

                // console.log(data)
                setDataFetched(true)
                // for checking the time 5 
                // setInterval(function () {
                //     console.log(Date.now() - start);

                //     // the difference will be in ms
                // }, 1000);
            } else {
                console.error('Failed to fetch data from the server.');
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
    }

    const fetchInventoryItems = async (page = 1) => {
        if (!user) {
            return
        }

        let endpoint = DOMAIN + '/inventory' + '/?'

        if (page) {
            endpoint += `page=${page}`
        }

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

        // console.log(sortBy)
        // console.log(endpoint)

        const response = await fetch(endpoint, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        }) // retrieves response from server as JSON
        const json = await response.json() // converts the json data into an array of objects

        // console.log(json.items)

        // console.log('Is json an array?', Array.isArray(json));
        if (response.ok) {
            // setInventoryItems(json.items)  // set state only if it's an array
            dispatch({ type: 'SET_INVENTORY_ITEMS', payload: json.items })

            setTotal(json.count)
            setCurrentPage(page)
        } else {
            console.error('Unexpected response: ', json.message)
            // setInventoryItems([])  // clear existing data or handle error appropriately
        }
    }

    useEffect(() => {
        if (user) {
            fetchAllInventoryItems()
            fetchInventoryItems()
        }
    }, [])



    // Handle search term changes
    const handleSearchChange = (event) => {
        // Update the search term state whenever the input value changes
        setSearchTerm(event.target.value);
    }

    const handleSearchClick = () => {
        fetchInventoryItems()
    }

    const handleSearch = (event) => {
        // Check if the function was called via a key down and if that key was Enter
        if (event.type === 'keydown' && event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action
            fetchInventoryItems(); // Call the function that fetches the inventory items
        }
    }
    const debouncedHandleSearchChange = _.debounce(handleSearchChange, 200);

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
                    {/* Disable the download button while data is not fetched */}
                    <Button
                        variant="light"
                        size='sm'
                        className='rounded-4 px-3 my-2 ms-auto me-2 shadow'
                        disabled={!dataFetched}
                    >
                        <CSVLink data={allInventoryItems} headers={headers} filename="inventory.csv">
                            Download as .csv file
                            <img className='ms-2 mb-1' src='icon_datatransferdownload_.png' alt="Download" />
                        </CSVLink>
                    </Button>


                    {/* Component for filtering items */}
                    <Filter min={min} max={max} brand={brand} motorModel={motorModel} stockStatus={stockStatus} onUpdate={handleFilterUpdate} />
                    {/* Component for sorting items */}
                    <SortBy sortBy={sortBy} onUpdate={handleSortByUpdate} />
                </ButtonToolbar>
            </Row>
            <Row>
                {/* Search Bar */}
                <InputGroup className="mb-5 mt-2 nopadding">
                    <Form.Control placeholder="Search" className='rounded-start-pill ps-4 shadow' onChange={debouncedHandleSearchChange} onKeyDown={handleSearch} value={searchTerm} />
                    <Button id="button-addon2"
                        variant='light'
                        className='rounded-end-pill py-2 px-3 border border-start-0 bg-white shadow'
                        onClick={handleSearchClick}>
                        <img className='mb-1 me-2' src='icon_magnifyingglass_.png' alt="Search" />
                    </Button>
                </InputGroup>
            </Row>
            <Row>
                {/* Number of results */}
                {/* <Container className='txt-gray-text fs-6 mb-2 d-flex justify-content-center'>{((currentPage - 1) * 50) + 1}-{} of {total} results</Container> */}
                <Container className='txt-gray-text fs-6 mb-2 d-flex justify-content-center'>
                    {total === 0
                        ? '0 results'
                        : `${((currentPage - 1) * 50) + 1} - ${Math.min(currentPage * 50, total)} of ${total} results`}
                </Container>
            </Row>
            <Row>

                {/* Pagination */}
                {/* 
                    STYLING OF A PAGE BUTTON/ INACTIVE PAGE: border mx-1 bg-main-dominant-red
                    STYLING OF ACTIVE PAGE: border mx-1 txt-main-dominant-red bg-white
                */}
                <Container className='d-flex justify-content-center mb-3'>
                    <PaginationButtons totalPages={totalPages} currentPage={currentPage} fetchInventoryItems={fetchInventoryItems}></PaginationButtons>
                </Container>
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
                        <Col className='txt-black col-2 fs-6 nopadding'>Retail Price</Col>
                        <Col className='txt-black col-2 fs-6 nopadding'>Date Added</Col>
                    </Row>
                    {/* Loop for Individual Inventory Items */}
                    {inventoryItems && inventoryItems.map((inventoryItem) => (
                        // Component for Inventory Items
                        <InventoryItemDetails key={inventoryItem._id} _id={inventoryItem._id} inventoryItem={inventoryItem} showPrice="all" />
                    ))}
                </Card>
            </Row>

            {/* Pagination */}
            {/* 
                STYLING OF A PAGE BUTTON/ INACTIVE PAGE: border mx-1 bg-main-dominant-red
                STYLING OF ACTIVE PAGE: border mx-1 txt-main-dominant-red bg-white
            */}
            <Container className='d-flex justify-content-center mt-3'>
                <PaginationButtons totalPages={totalPages} currentPage={currentPage} fetchInventoryItems={fetchInventoryItems}></PaginationButtons>
            </Container>

            <Row>
                {/* Number of results */}
                <Container className='txt-gray-text fs-6 mt-2 d-flex justify-content-center'>
                    {total === 0
                        ? ''
                        : `${((currentPage - 1) * 50) + 1} - ${Math.min(currentPage * 50, total)} of ${total} results`}
                </Container>
            </Row>
        </Container>
    )
}

export default Inventory