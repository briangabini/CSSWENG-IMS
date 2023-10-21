import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>JPD</h1>
                </Link>
            </div>
        </header>    
    )
}

export default Header