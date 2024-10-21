import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const login_URL = 'http://127.0.0.1:8000/auth/login'
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const login = async () => {
        try {
            const response = await axios.post(login_URL, {
                Username: username,
                Password: password
            })
            console.log("response: ", response)
            console.log("response.data: ", response.data)
            if (response.data.success) {
                setUsername('')
                setPassword('')
                console.log("Login successful", "success: ", response.data.success, "token: ", response.data.token, "admin: ", response.data.admin)
                sessionStorage.setItem('successfulLogin', response.data.success)
                sessionStorage.setItem('token', response.data.token)
                sessionStorage.setItem('admin', response.data.admin)
                sessionStorage.setItem('id', response.data.id)
                response.data.admin ? navigate('/admin'): navigate('/user')
            } else {
                console.log("Login failed: ", "error: ", response.data.error, "success: ", response.data.success)
                alert(response.data.error)
            }
        } catch (error) {
            if (error.response) {
                console.error("success: ", error.response.data.success, "error: ", error.response.data.error)
                alert(error.response.data.error)
            } else if (error.request) {
                console.error("error: ", error.request)
                alert(error.request)
            }
        }
    }

    return (
        <div className='Login'>
            <label className="heading">Next Generation E-Commerce</label>
            <br />
            <label>Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br />
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button className='LoginButton' onClick={login}>Login</button>
            <label className="newUser"> New User?
                <a className="register" href="/new-user-registration" > Register</a>
            </label>
        </div>
    )
}
export default Login