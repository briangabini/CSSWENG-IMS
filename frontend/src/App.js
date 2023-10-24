// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'

// pages & components
import Inventory from './pages/Inventory'
import SalesPage from './pages/SalesPage'
import AddInventoryItems from './pages/AddInventoryItems'
import ShoppingCart from './pages/ShoppingCart'
import AuditLog from './pages/AuditLog'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import VerifiedUserList from './pages/VerifiedUserList'
import Calendar from './pages/Calendar'
import AddVerifiedUser from './pages/AddVerifiedUser'
import EditVerifiedUser from './pages/EditVerifiedUser'
import EditItem from './pages/EditItem'
import AdminControlCenter from './pages/AdminControlCenter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <ConditionalNavbar />

      <div className="pages">
          <Routes>

            <Route
              path="/"
              element={<Login/>}
            />
            
            <Route
              path="/dashboard"
              element={<Dashboard/>}
            />

            <Route
              path="/inventory"
              element={<Inventory/>}
            />

            <Route
              path="/sales-page"
              element={<SalesPage/>}
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
              element={<AuditLog/>}
            />

            <Route
              path="/VerifiedUserList"
              element={<VerifiedUserList />}
            />

            <Route
              path="/calendar"
              element={<Calendar/>}
            />

            <Route
              path="/add-verified-user"
              element={<AddVerifiedUser/>}
            />

            <Route
              path="/edit-verified-user"
              element={<EditVerifiedUser/>}
            />

            <Route
              path="/edit-item"
              element={<EditItem/>}
            />

            <Route
              path='/admin-control-center'
              element={<AdminControlCenter/>}
            />

          </Routes>
        </div>

        </BrowserRouter>

    </div>
  );
}


function ConditionalNavbar(){
  const location = useLocation()

  if (location.pathname === '/'){
    return null
  }

  return <Navbar/>
}

export default App;
