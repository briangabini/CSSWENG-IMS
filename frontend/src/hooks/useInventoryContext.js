import { InventoryItemsContext } from '../context/InventoryContext'
import { useContext } from 'react'

export const useInventoryContext = () => {
    const context = useContext(InventoryItemsContext)

    if (!context) {
        throw Error('useInventoryContext must be used inside an AuthContextProvider')
    }

    // returns the context value which is the state, and dispatch in InventoryContext.js
    return context
}