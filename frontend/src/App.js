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
import { useState, useEffect  } from 'react';

function App() {
  
  // states to track if on login page
  const [isLoginPage, setIsLoginPage] = useState(false);

  // Conditional styling (background) for login page
  const loginbg = {
    backgroundImage: isLoginPage ? "url(/BackgroundRedBlur.png)" : "none",
    backgroundRepeat: isLoginPage ? 'no-repeat' : "none",
    height: isLoginPage ? '100vh' : "auto",
    width: isLoginPage ? '100wh' : "auto",
    backgroundSize: isLoginPage ? '40% 100vh' : "auto",
  };

  return (
    <div className="App" style={loginbg}>
      <BrowserRouter>

        <ConditionalNavbar setIsLoginPage={setIsLoginPage}/>

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
      </BrowserRouter>

    </div>
  );
}


function ConditionalNavbar({ setIsLoginPage }) {
  const location = useLocation()

  // Added this to implement conditional styling of background for the login page
  if (location.pathname === '/') {
    setIsLoginPage(true);
  } else {
    setIsLoginPage(false);
  }

  if (location.pathname === '/') {
    return null
  }

  return <NavigationBar />
}


export default App;
