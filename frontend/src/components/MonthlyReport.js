import SalesGraph from "./SalesGraph";
import SalesRank from "./SalesRank";
import SalesQuota from "./SalesQuota";
import { useAuthContext } from '../hooks/useAuthContext.js'
import { DOMAIN } from '../config'
import { useState, useEffect } from 'react'

const reportPeriod = "Monthly";

const MonthlyReport = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext()

    const fetchOrders = async () => {

        const response = await fetch(`${DOMAIN}/orders/month`, {
            method: "POST",
            body: JSON.stringify({ date: new Date() }), // convert to json
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        // check if the status is not OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // deserialize json to js object
        const json = await response.json()
        setOrders(json)

    }
    useEffect(() => {
        // if (user) {
        // if (orders.length !== 0) {
        fetchOrders()

        if (orders) {
            setIsLoading(true)
        }
        // }
        // }
    }, [user])
    return (
        <>
            <SalesGraph period={reportPeriod} />
            {/* <SalesQuota period= {reportPeriod} /> */}
            <SalesRank period={reportPeriod} orderItem={orders} isLoading={isLoading} />
        </>
    )
}

export default MonthlyReport