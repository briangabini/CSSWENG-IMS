import SalesGraph from "./SalesGraph";
import SalesRank from "./SalesRank";

const reportPeriod = "Daily";

const DailyReport = () => {
    return (
        <>
            <SalesGraph period = {reportPeriod} />

            <SalesRank period = {reportPeriod} />
            
        </>
    )
}

export default DailyReport