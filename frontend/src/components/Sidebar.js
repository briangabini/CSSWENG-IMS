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
          <Offcanvas.Title>Quick Access Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {/* Links to the inventory page */}
            <Link to="/inventory">
                <img src="icon_book_.png"></img>
                < h5>Inventory</ h5>
            </Link>

            {/* Links to the finance page */}
            <Link to="/sales-page">
                < h5>Finance</ h5>
            </Link>

            
            {/* Links to the add item page */}
            <Link to="/inventory/add-items">
                < h5>Add Item</ h5>
            </Link>

            {/* Links to the check out page */}
            <Link to="/shopping-cart">
                < h5>Check Out</ h5>
            </Link>

            {/* Links to the shopping cart */}
            <Link to="/audit-log">
                < h5>Audit Log</ h5>
            </Link>

            {/** ADD IF STATEMENT TO CHECK IF USER IS ADMIN OR NOT */}
            {/* Links to the login page*/}
            <Link to="/admin-control-center">
                < h5>Admin Control Center</ h5>
            </Link>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;