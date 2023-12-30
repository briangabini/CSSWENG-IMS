import { createContext, useReducer, useEffect } from 'react'

// create context
export const TransactionTypeContext = createContext()

/**
 * Reducer function for managing transaction type state in the context.
 * @param {Object} state - The current state.
 * @param {Object} action - The action object containing the type and payload.
 * @returns {Object} - The updated state.
 */
export const transactionTypeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTION_TYPE':
            return {...state, transactionType: action.payload}
        default:
            return state
    }
}

/**
 * Provides a context for managing transaction types.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The JSX element representing the context provider.
 */
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