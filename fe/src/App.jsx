import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/NewUserRegistration'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new-user-registration" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
