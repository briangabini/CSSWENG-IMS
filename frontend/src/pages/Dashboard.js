// import {useEffect, useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import Revenue from '../components/Revenue';
const Home = () => {
    // const [inventoryItems, setInventoryItems] = useState(null)

    // useEffect(() => {
    //     const fetchInventoryItems = async () => {
    //         const response = await fetch('/jpd')
    //         const json = await response.json() // converts the json data into an array of objects

    //         if (response.ok) {
    //             setInventoryItems(json)
    //         }
    //     }

    //     fetchInventoryItems()
    // }, [])

    return (
        // <div className="home">
        //     <div className="inventory-items">
        //         {/* {inventoryItems && inventoryItems.map((inventoryItem) => (
        //             <p key={inventoryItem._id}>{inventoryItem.partName}</p>
        //         ))} */}
        //     </div>
        // </div>
        
        <Container className='border'>
            <Row>
                <Col className='greeting'>Good day, Justin Depano.</Col>
            </Row>
            <Row>
                <Col>
                    <Revenue></Revenue>
                </Col>
                <Col>
                    <Row>
                        <Col>Item of the Month</Col>
                    </Row>
                    <Row>
                        <Col>Card</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home