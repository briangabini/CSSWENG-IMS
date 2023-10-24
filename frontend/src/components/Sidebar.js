import { Link } from 'react-router-dom'

const Sidebar = () => {

    return (
        <aside className="sidebar">
            <div className="container">

                {/* Links to the inventory */}
                <Link to="/inventory">
                    <p>Inventory</p>
                </Link>

                {/* Links to the Sales Page */}
                <Link to="/sales-page">
                    <p>Finance</p>
                </Link>

                {/* Links to the add items page */}
                <Link to="/inventory/add-items">
                    <p>Add Item</p>
                </Link>

                {/* Links to the shopping cart */}
                <Link to="/shopping-cart">
                    <p>Shopping Cart</p>
                </Link>

                
                {/* Links to the audit log */}
                <Link to="/audit-log">
                    <p>Audit Log</p>
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar