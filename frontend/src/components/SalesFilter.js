import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import { Container, Form, Row, Col, Overlay } from 'react-bootstrap';
import {useState, useEffect, useRef} from 'react'

const SalesFilter = () => {

    const [showPopover, setShowPopover] = useState(false);
    const targetRef = useRef(null);
  
    const handleButtonClick = () => {
      setShowPopover(!showPopover);
    };
  
    const handleOverlayClose = () => {
      setShowPopover(false);
    };

    return (
        <>
            <Overlay
                trigger="click"
                placement="bottom"
                show={showPopover}
                target={targetRef.current}
                container={document.body}
                onHide={handleOverlayClose}
                rootClose>
                    <Popover className='p-2 w-auto'>
                        <Container className='m-2'>
                            <Row className='fw-bold my-2'>Stock Status</Row>
                            <Row>
                                <Form.Check 
                                    id="cb1"
                                    name="stockStatus"
                                    type="radio"
                                    label="Latest Sales" 
                                />
                                <Form.Check 
                                    id="cb2"
                                    name="stockStatus"
                                    type="radio"
                                    label="Top Sales"
                                />
                                <Form.Check 
                                    id="cb3"
                                    name="stockStatus"
                                    type="radio"
                                    label="Least Sales"
                                />
                            </Row> 
                        </Container>
                    </Popover>
            </Overlay>
            
            <Button variant="light"
                    size='sm'
                    className='rounded-4 px-3 shadow bg-main-dominant-red border-0 txt-white'
                    onClick={handleButtonClick}
                    ref={targetRef}>
                {/* The current filter in place */}
                Latest Sales
                <img className='ms-2 mb-1' src='icon_sort_.png'></img>
            </Button>
        </>
    )
}

export default SalesFilter