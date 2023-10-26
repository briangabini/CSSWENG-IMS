import { Container, Row, Col, Button, ButtonToolbar, InputGroup, Form, Card } from 'react-bootstrap'
import VerifiedUserDetails from '../components/VerifiedUserDetails'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// components 
import InventoryItemDetails from '../components/InventoryItemDetails'
import Filter from '../components/Filter'
import SortBy from '../components/SortBy'
const DOMAIN = require('../config')

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState(null)

    useEffect(() => { 
        const fetchInventoryItems = async () => { 
            const response = await fetch(DOMAIN + '/inventory') // retrieves response from server as JSON
            const json = await response.json() // converts the json data into an array of objects

            if (response.ok) {
                setInventoryItems(json)
            }
        }

        

        fetchInventoryItems()
    }, [])

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
                    <Form.Control placeholder="Search" className='rounded-start-pill ps-4 shadow'/>
                    <Button id="button-addon2" variant="light" className='rounded-end-pill py-2 px-3 shadow'>
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