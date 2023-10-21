import {useEffect, useState} from 'react'

// components 
import InventoryItemDetails from '../components/InventoryItemDetails'

const Home = () => {
    const [inventoryItems, setInventoryItems] = useState(null)

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const response = await fetch('/jpd')
            const json = await response.json() // converts the json data into an array of objects

            if (response.ok) {
                setInventoryItems(json)
            }
        }

        fetchInventoryItems()
    }, [])

    return (
        <div className="home">
            <div className="inventory-items">
                {inventoryItems && inventoryItems.map((inventoryItem) => (
                    <InventoryItemDetails key={inventoryItem._id} inventoryItem={inventoryItem}/>
                ))}
            </div>
        </div>
    )
}

export default Home