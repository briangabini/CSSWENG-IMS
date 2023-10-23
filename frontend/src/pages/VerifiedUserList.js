// components 
import VerifiedUserDetails from '../components/VerifiedUserDetails'
import { useEffect, useState } from 'react'

const VerifiedUserList = () => {

    const VerifiedUsers = () => {
        const [userDetails, setVerifiedUsers] = useState(null)
    
        useEffect(() => { 
            const fetchVerifiedUsers = async () => { 
                const response = await fetch('/jpd/users') // retrieves response from server as JSON
                const json = await response.json() // converts the json data into an array of objects
    
                if (response.ok) {
                    setVerifiedUsers(json)
                }
            }
    
            
    
            fetchVerifiedUsers()
        }, [])
        
    return (
         <div className="users">
            <h1>THIS IS THE VERIFIED USER LIST</h1>

            <div className="verified-users">
                {userDetails && userDetails.map((userDetail) => (
                    <VerifiedUserDetails key={userDetail._id}  userDetail={userDetail} /> 
                ))} 
            </div>
        </div>
    )
}  
}

export default VerifiedUserList