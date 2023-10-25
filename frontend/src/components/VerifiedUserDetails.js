import { Row, Col } from "react-bootstrap";
const VerifiedUserDetails = ({userDetail}) => {
    console.log(userDetail);
    return (
        <Row className='w-100 nopadding border-top my-1'>
            <Col className='txt-gray-text border col-4 fs-6 nopadding'>{userDetail.employeeName}</Col>
            <Col className='txt-gray-text border col-4 fs-6 nopadding'>{userDetail.emailAddress}</Col>
            <Col className='txt-gray-text border col-2 fs-6 nopadding'>{userDetail.role}</Col>
            <Col className='txt-gray-text border col-2 fs-6 nopadding'>{userDetail.dateAdded}</Col>
        </Row>
    )
}

export default VerifiedUserDetails