import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/NewUserRegistration'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin'
import AdminHome from './pages/AdminHome'

function AdminLayout() {
  return (
    <ProtectedRouteAdmin>
      <Outlet />
    </ProtectedRouteAdmin>
  )
}


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new-user-registration" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminHome />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
