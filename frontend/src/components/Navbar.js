import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                {/* Links to the dashboard */}
                <Link to="/dashboard">
                    <h1>JPDGarage</h1>
                </Link>

                {/* Links to the shopping cart */}
                <Link to="/shopping-cart">
                    <p>Cart</p>
                    {/** ^^This part should have functionality to have # of items in cart */}
                </Link>

                
                {/* Links to the login page*/}
                <Link to="">
                    <p>Justin Depano</p>
                    {/** ^^This part should change name depending on logged-in user */}
                </Link>
            </div>
        </header>
    )
}

export default Navbar