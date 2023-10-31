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
                    {/* Sorts the items alphabetically */}
                    <Form.Check type="radio" label="A-Z" />

                    {/* Sorts the items reverse alphabetically */}
                    <Form.Check type="radio" label="Z-A" />

                    {/* Sorts the items by price in ascending order */}
                    <Form.Check type="radio" label="Price (Ascending)" />

                    {/* Sorts the items by price in descending order */}
                    <Form.Check type="radio" label="Price (Descending)" />

                    {/* Sorts the items by stock number in ascending order */}
                    <Form.Check type="radio" label="Stock Number (Ascending)" />

                    {/* Sorts the items by stock number in descending order */}
                    <Form.Check type="radio" label="Stock Number (Descending)" />

                    {/* Sorts the items by latest added items */}
                    <Form.Check type="radio" label="Date Added (Latest)" />

                    {/* Sorts the items by oldest added items */}
                    <Form.Check type="radio" label="Date Added (Oldest)" />

                    {/* Sorts the items by latest modified items */}
                    <Form.Check type="radio" label="Date Modified (Latest)" />

                    {/* Sorts the items by oldest modifed items */}
                    <Form.Check type="radio" label="Date Modified (Oldest)" />

                </Container>
            </Popover>
          }
        >
        <Button variant="light" size='sm' className='rounded-4 px-3 m-2 shadow'>\
            {/* Current sort option */}
            Sort by: Date, new to old
            <img className='ms-2 mb-1' src='icon_sort_.png'></img>
        </Button>
        </OverlayTrigger>
    )
}

export default SortBy