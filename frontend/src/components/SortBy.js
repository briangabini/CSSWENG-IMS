import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Container, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const SortBy = ({ sortBy, onUpdate }) => {
    const [localValue, setLocalValue] = useState(sortBy)

    useEffect(() => {
        console.log('Updated local value:', localValue)
        onUpdate(localValue)
    }, [localValue])

    const handleUpdate = (event) => {
        // const newValue = document.querySelector('input[name="sortGroup"]:checked').value
        const newValue = event.target.value
        setLocalValue(newValue)
    }

    return (
        <OverlayTrigger
            trigger="click"
            placement="bottom-end"
            overlay={
                <Popover className='p-2 w-auto'>
                    <Container className='m-2'>
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="A-Z"
                            value="partName,asc"
                            onChange={handleUpdate}
                            checked={localValue === "partName,asc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Z-A"
                            value="partName,desc"
                            onChange={handleUpdate}
                            checked={localValue === "partName,desc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Price (Ascending)"
                            value="retailPrice,asc"
                            onChange={handleUpdate}
                            checked={localValue === "retailPrice,asc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Price (Descending)"
                            value="retailPrice,desc"
                            onChange={handleUpdate}
                            checked={localValue === "retailPrice,desc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Stock Number (Ascending)"
                            value="stockNumber,asc"
                            onChange={handleUpdate}
                            checked={localValue === "stockNumber,asc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Stock Number (Descending)"
                            value="stockNumber,desc"
                            onChange={handleUpdate}
                            checked={localValue === "stockNumber,desc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Date Added (Latest)"
                            value="dateAdded,desc"
                            onChange={handleUpdate}
                            checked={localValue === "dateAdded,desc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Date Added (Oldest)"
                            value="dateAdded,asc"
                            onChange={handleUpdate}
                            checked={localValue === "dateAdded,asc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Date Modified (Latest)"
                            value="dateModified,desc"
                            onChange={handleUpdate}
                            checked={localValue === "dateModified,desc"}
                        />
                        <Form.Check
                            name="sortGroup"
                            type="radio"
                            label="Date Modified (Oldest)"
                            value="dateModified,asc"
                            onChange={handleUpdate}
                            checked={localValue === "dateModified,asc"}
                        />
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