import { Container, Row, Col, Button, ButtonToolbar, InputGroup, Form, Card } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import VerifiedUserDetails from '../components/VerifiedUserDetails'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// components 
import InventoryItemDetails from '../components/InventoryItemDetails'
import Filter from '../components/Filter'
import SortBy from '../components/SortBy'
import { DOMAIN } from '../config'

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

     
    const fetchInventoryItems = async (query = '') => { 
        let endpoint = DOMAIN + '/inventory';
        if (query) {
            // if a query is present, we assume a search is intended
            endpoint += `/search?search=${query}`; // using "query" as the query parameter name
        }
        const response = await fetch(endpoint) // retrieves response from server as JSON
        const json = await response.json() // converts the json data into an array of objects

        console.log('Is json an array?', Array.isArray(json));
        if (response.ok) {
            setInventoryItems(json);  // set state only if it's an array
        } else {
            console.error('Unexpected response:', json);
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

    const handleSearchClick = () => {
        // Trigger the search operation when the button is clicked
        if (searchTerm.trim()) {
            fetchInventoryItems(searchTerm.trim());
        } else {
            // If search term is empty, you might want to fetch the initial data again or handle it differently
            // Here we're just fetching the initial set again
            fetchInventoryItems();
        }
    };


    return (
        // <div className="inventory">
        //     <h1>THIS IS THE INVENTORY</h1>

        //     <div className="inventory-items">
        //         {inventoryItems && inventoryItems.map((inventoryItem) => (
        //             <InventoryItemDetails key={inventoryItem._id}  inventoryItem={inventoryItem} /> 
        //         ))} 
        //     </div>
        // </div>
        <Container className='main'>
            <Row className='fs-2 fw-bold'>
                Inventory
            </Row>
            <Row>
                <ButtonToolbar className='nopadding'>
                    <Button variant="light" size='sm' className='rounded-4 px-3 my-2 ms-auto me-2 shadow'>
                        Download as .csv file
                        <img className='ms-2 mb-1' src='icon_datatransferdownload_.png'></img>
                    </Button>
                    <Filter />
                    <SortBy />
                </ButtonToolbar>
            </Row>
            <Row>
                <InputGroup className="mb-5 mt-2 nopadding">
                    <Form.Control placeholder="Search" className='rounded-start-pill ps-4 shadow' value={searchTerm} onChange={handleSearchChange}/>
                    <Button id="button-addon2" variant="light" className='rounded-end-pill py-2 px-3 shadow' onClick={handleSearchClick}>
                        <img className='mb-1 me-2' src='icon_magnifyingglass_.png' alt="Search" />
                    </Button>
                </InputGroup>
            </Row>
            <Row>
                <Card className='rounded-4 shadow'>
                    <Row className='w-100 nopadding my-2'>
                        <Col className='txt-gray-text col-3 fs-6 nopadding'>Part Name</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Brand</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Motor model</Col>
                        <Col className='txt-gray-text col-1 fs-6 nopadding'>Stock No.</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Retail Price</Col>
                        <Col className='txt-gray-text col-2 fs-6 nopadding'>Date Added</Col>
                    </Row>
                    {inventoryItems && inventoryItems.map((inventoryItem) => (
                       <InventoryItemDetails key={inventoryItem._id} _id={inventoryItem._id} inventoryItem={inventoryItem} /> 
                    ))} 

                </Card>


            </Row>
        </Container>
    )
}

export default Inventory