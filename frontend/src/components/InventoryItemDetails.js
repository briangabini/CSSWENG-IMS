const InventoryItemDetails = ({inventoryItem}) => {
    return (
        <div className="inventory-item-details">
            <p>Part Name: {inventoryItem.partName}</p>
            <p>Brand: {inventoryItem.brand}</p>
            <p>Motor Model: {inventoryItem.motorModel}</p>
            <p>Stock Number: {inventoryItem.stockNumber}</p>
            <p>Retail Price: {inventoryItem.retailPrice}</p>
        </div>
    )
}

export default InventoryItemDetails