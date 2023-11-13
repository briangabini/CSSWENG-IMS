import { useTransactionTypeContext } from './useTransactionTypeContext'

export const useTransactionType = () => {
    const { dispatch } = useTransactionTypeContext()

    const setRetail = () => {
        const transactionType = 'retail'

        dispatch({ type: 'SET_TRANSACTION_TYPE', payload: transactionType })
        localStorage.setItem('transaction', transactionType)
    }
    
    const setWholesale = () => {
        const transactionType = 'wholesale'

        dispatch({type: 'SET_TRANSACTION_TYPE', payload: transactionType})
        localStorage.setItem('transaction', transactionType)

    }

    return { setRetail, setWholesale }
}