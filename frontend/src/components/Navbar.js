import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>JPD Garage</h1>
                </Link>

                {/* Links to the inventory */}
                <Link to="/inventory">
                    <p>Inventory</p>
                </Link>

                {/* Links to the Sales Page */}
                <Link to="/sales-page">
                    <p>Sales Page</p>
                </Link>

                {/* Links to the add items page */}
                <Link to="/inventory/add-items">
                    <p>Add items to Inventory</p>
                </Link>

                {/* Links to the shopping cart */}
                <Link to="/shopping-cart">
                    <p>Shopping cart</p>
                </Link>

                
                {/* Links to the audit log */}
                <Link to="/audit-log">
                    <p>Audit Log</p>
                </Link>
            </div>
        </header>
    )
}

export default Navbar