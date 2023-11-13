import { createContext, useReducer, useEffect } from 'react'

// create context
export const TransactionTypeContext = createContext()

export const transactionTypeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTION_TYPE':
            return {...state, transactionType: action.payload}
        default:
            return state
    }
}

export const TransactionTypeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionTypeReducer, {
        transactionType: null
    })

    useEffect(() => {
        const transactionType = localStorage.getItem('transaction')
        if (transactionType) {
            dispatch({ type: 'SET_TRANSACTION_TYPE', payload: transactionType });
        } 
    }, []);

    // return jsx template
    return (
        // wrap the entire component tree so that every component has access
        // wrap the root app component in index.js
        // access the value prop using useInventoryContext which returns the context value = state, dispatch
        <TransactionTypeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TransactionTypeContext.Provider>
    )
}