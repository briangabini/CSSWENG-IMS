import { useNavigate } from 'react-router-dom'


const SalesPaymentsOption = () => {
    const navigate = useNavigate();

    const navigateSales = () => {
        navigate(`/sales-page`);
    };

    const navigatePayments = () => {
        navigate(`/payments`);
    }

    return (
        <>
            <div className='d-flex flex-row fs-2 fw-bold'>
                    <span className='hover' onClick={navigateSales}>Sales</span>
                    <span className='ms-3 txt-faded-text-button hover' onClick={navigatePayments}>Payments</span>
            </div>
        </>
    )
}

export default SalesPaymentsOption