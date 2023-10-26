import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <p>=</p>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.

          {/* Links to the inventory page */}
          <Link to="/inventory">
                <h4>Inventory</h4>
            </Link>

            {/* Links to the finance page */}
            <Link to="/finance">
                <h4>Finance</h4>
            </Link>

            
            {/* Links to the add item page */}
            <Link to="/add-item">
                <h4>Add Item</h4>
            </Link>

            {/* Links to the check out page */}
          <Link to="/check-out">
                <h4>Check Out</h4>
            </Link>

            {/* Links to the shopping cart */}
            <Link to="/audit-log">
                <h4>Audit Log</h4>
            </Link>

            {/** ADD IF STATEMENT TO CHECK IF USER IS ADMIN OR NOT */}
            {/* Links to the login page*/}
            <Link to="/admin-control-center">
                <h4>Admin Control Center</h4>
            </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;