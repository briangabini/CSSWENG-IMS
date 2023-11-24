import SalesGraph from "./SalesGraph";
import SalesRank from "./SalesRank";
import SalesQuota from "./SalesQuota";

const reportPeriod = "Monthly";

const MonthlyReport = () => {
    return (
        <>
            <SalesGraph period= {reportPeriod} />

            <SalesRank period= {reportPeriod}/>
            <SalesQuota />
        </>
    )
}

export default MonthlyReport