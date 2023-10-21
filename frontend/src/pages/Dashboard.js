import { Link } from 'react-router-dom'

const Dashboard = () => {
    
    return (
        <div className="dashboard">
            <h1>THIS IS THE dashboard page</h1>

            <Link to="/">
                Updates
            </Link>
        </div>
    )
}

export default Dashboard