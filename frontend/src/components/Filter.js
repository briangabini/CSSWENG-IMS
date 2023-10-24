import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const Filter = () => {
    return (
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover>
              <Popover.Header as="h3"></Popover.Header>
              <Popover.Body>
                   sddsd
              </Popover.Body>
            </Popover>
          }
        >
        <Button variant="light" size='sm' className='rounded-4 px-3 m-2 shadow'>
            Filter: In Stock
            <img className='ms-2 mb-1' src='icon_sort_.png'></img>
        </Button>
        </OverlayTrigger>
    )
}

export default Filter