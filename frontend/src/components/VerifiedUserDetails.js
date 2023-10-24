import { Row, Col } from "react-bootstrap";
const VerifiedUserDetails = ({userDetail}) => {
    console.log(userDetail);
    return (
        // <div className="verified-user-details">
        //     <p>Employee Name: {userDetail.employeeName}</p>
        //     <p>Email Address: {userDetail.emailAddress}</p>
        //     <p>Role: {userDetail.role}</p>
        //     <p>Date Added: {userDetail.dateAdded}</p>
        // </div>
        <Row className='w-100 nopadding' style={{border: "1px solid red"}}>
            <Col className='txt-gray-text border col-4 fs-6 nopadding'>{userDetail.employeeName}</Col>
            <Col className='txt-gray-text border col-4 fs-6 nopadding'>{userDetail.emailAddress}</Col>
            <Col className='txt-gray-text border col-2 fs-6 nopadding'>{userDetail.role}</Col>
            <Col className='txt-gray-text border col-2 fs-6 nopadding'>{userDetail.dateAdded}</Col>
        </Row>
    )
}

export default VerifiedUserDetails