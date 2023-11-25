import SalesGraph from "./SalesGraph";
import SalesRank from "./SalesRank";
import SalesQuota from "./SalesQuota";

const reportPeriod = "Daily";

const DailyReport = () => {
    return (
        <>
            <SalesGraph period = {reportPeriod} />
            <SalesQuota period= {reportPeriod} />
            <SalesRank period = {reportPeriod} />
            
        </>
    )
}

export default DailyReport