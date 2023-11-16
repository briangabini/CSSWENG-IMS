import { createContext, useReducer } from 'react'

// create context
export const InventoryItemsContext = createContext()

export const inventoryItemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INVENTORY_ITEMS':
            return {
                inventoryItems: action.payload
            }
        case 'DELETE_INVENTORY_ITEM':
            // filter the inventory items to remove the recently remove inventory item from the array of inventoryItems
            return {
                inventoryItems: state.inventoryItems.filter(item => item._id !== action.payload._id)
            } 
        default:
            return state
    }
}

// provide this context to our application component tree, so that the components can access it
// create context provider component
export const InventoryItemsContextProvider = ({ children }) => {
    // use a reducer instead of a state
    // state refers to previous (current) state; dispatch when called, will send action objects to reducer function
    // things like inventoryItems: 'SET_INVENTORY_ITEMS' will replace the null value of the reducer
    const [state, dispatch] = useReducer(inventoryItemsReducer, {
        inventoryItems: null
    })

    // return jsx template
    return (
        // wrap the entire component tree so that every component has access
        // wrap the root app component in index.js
        // access the value prop using useInventoryContext which returns the context value = state, dispatch
        <InventoryItemsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </InventoryItemsContext.Provider>
    )
}