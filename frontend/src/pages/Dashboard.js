// import {useEffect, useState} from 'react'

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
        <div className="home">
            <div className="inventory-items">
                {/* {inventoryItems && inventoryItems.map((inventoryItem) => (
                    <p key={inventoryItem._id}>{inventoryItem.partName}</p>
                ))} */}
            </div>
        </div>
    )
}

export default Home