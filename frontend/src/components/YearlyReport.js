import SalesGraph from "./SalesGraph";
import SalesRank from "./SalesRank";
import SalesQuota from "./SalesQuota";

const reportPeriod = "Yearly";

const YearlyReport = () => {
    return (
        <>
            <SalesGraph period= {reportPeriod} />
            <SalesQuota period= {reportPeriod} />
            <SalesRank period= {reportPeriod}/>
        </>
    )
}

export default YearlyReport