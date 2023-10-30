// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'

// pages & components
import Inventory from './pages/Inventory'
import SalesPage from './pages/SalesPage'
import AddInventoryItems from './pages/AddInventoryItems'
import ShoppingCart from './pages/ShoppingCart'
import AuditLog from './pages/AuditLog'
import Dashboard from './pages/Dashboard'
import VerifiedUserList from './pages/VerifiedUserList'
import Calendar from './pages/Calendar'
import AddVerifiedUser from './pages/AddVerifiedUser'
import EditVerifiedUser from './pages/EditVerifiedUser'
import AdminControlCenter from './pages/AdminControlCenter';
import Login from './pages/Login'
import EditItem from './pages/EditItem'

import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar'
import NavigationBar from './components/Navbar';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <ConditionalNavbar />

        <Row fluid className='border'>

          <div className="pages">
            <Routes>

              <Route
                path="/"
                element={<Login />}
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/inventory"
                element={<Inventory />}
              />

              <Route
                path="/sales-page"
                element={<SalesPage />}
              />

              <Route
                path="/inventory/add-items"
                element={<AddInventoryItems />}
              />

              <Route
                path="/shopping-cart"
                element={<ShoppingCart />}
              />

              <Route
                path="/audit-log"
                element={<AuditLog />}
              />

              <Route
                path="/verified-user-list"
                element={<VerifiedUserList />}
              />

              <Route
                path="/calendar"
                element={<Calendar />}
              />

              <Route
                path="/add-verified-user"
                element={<AddVerifiedUser />}
              />

              <Route
                path="/edit-verified-user"
                element={<EditVerifiedUser />}
              />

              <Route
                path="/edit-item/:id"
                element={<EditItem />}
              />

              <Route
                path='/admin-control-center'
                element={<AdminControlCenter />}
              />

            </Routes>
          </div>
        </Row>
      </BrowserRouter>

    </div>
  );
}


function ConditionalNavbar() {
  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }

  return <NavigationBar />
}


export default App;
