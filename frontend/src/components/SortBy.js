import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Container, Form } from 'react-bootstrap';

const SortBy = () => {
    return (
        <OverlayTrigger
          trigger="click"
          placement="bottom-end"
          overlay={
            <Popover className='p-2 w-auto'>
                <Container className='m-2'>
                    <Form.Check type="radio" label="A-Z" />
                    <Form.Check type="radio" label="Z-A" />
                    <Form.Check type="radio" label="Price (Ascending)" />
                    <Form.Check type="radio" label="Price (Descending)" />
                    <Form.Check type="radio" label="Stock Number (Ascending)" />
                    <Form.Check type="radio" label="Stock Number (Descending)" />
                    <Form.Check type="radio" label="Date Added (Latest)" />
                    <Form.Check type="radio" label="Date Added (Oldest)" />
                    <Form.Check type="radio" label="Date Modified (Latest)" />
                    <Form.Check type="radio" label="Date Modified (Oldest)" />

                </Container>
            </Popover>
          }
        >
        <Button variant="light" size='sm' className='rounded-4 px-3 m-2 shadow'>
            Sort by: Date, new to old
            <img className='ms-2 mb-1' src='icon_sort_.png'></img>
        </Button>
        </OverlayTrigger>
    )
}

export default SortBy