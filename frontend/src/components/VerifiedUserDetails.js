const VerifiedUserDetails = ({userDetail}) => {
    console.log(userDetail);
    return (
        <div className="verified-user-details">
            <p>Employee Name: {userDetail.employeeName}</p>
            <p>Email Address: {userDetail.email}</p>
            <p>Role: {userDetail.role}</p>
            <p>Date Added: {userDetail.dateAdded}</p>
        </div>
    )
}

export default VerifiedUserDetails