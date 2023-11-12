import { useTransactionTypeContext } from './useTransactionTypeContext'

export const useTransactionType = () => {
    const { dispatch } = useTransactionTypeContext()

    const setRetail = () => {
        dispatch({type: 'SET_TRANSACTION_TYPE', payload: 'retail'})
    }
    
    const setWholesale = () => {
        dispatch({type: 'SET_TRANSACTION_TYPE', payload: 'wholesale'})
    }

    return { setRetail, setWholesale }
}