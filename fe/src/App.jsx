import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/NewUserRegistration'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin'
import ProtectedRouteUser from './components/ProtectedRouteUser'
import AdminCategories from './pages/AdminCategories'
import AdminProducts from './pages/AdminProducts'
import AdminCustomers from './pages/AdminCustomers'
import AdminStatistics from './pages/AdminStatistics'

import UserProducts from './pages/UserProducts'
import UserOrders from './pages/UserOrders'
import UserAccount from './pages/UserAccount'
import UserLogout from './pages/UserLogout'

function AdminLayout() {
  return (
    <ProtectedRouteAdmin>
      <Outlet />
    </ProtectedRouteAdmin>
  )
}

function UserLayout() {
  return (
    <ProtectedRouteUser>
      <Outlet />
    </ProtectedRouteUser>
  )
}


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new-user-registration" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="statistics" element={<AdminStatistics />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route path="" element={<UserProducts />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="log-out" element={<UserLogout />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
