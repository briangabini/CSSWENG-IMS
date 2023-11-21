import { TransactionTypeContext } from "../context/TransactionTypeContext.js"
import { useContext } from "react"

export const useTransactionTypeContext = () => {
    const context = useContext(TransactionTypeContext)

    if (!context) {
        throw Error('useTransactionTypeContext must be used inside a TransactionTypeContextProvider')
    }

    return context
}