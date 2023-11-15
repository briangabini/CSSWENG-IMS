import { Link } from 'react-router-dom'

const Login = () => {

    return (
        <div className="login-page">
            <h1>THIS IS THE LOGIN PAGE</h1>

            <Link to="/dashboard">
                Login
            </Link>
        </div>
    )
}

export default Login