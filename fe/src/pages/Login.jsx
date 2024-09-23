import './Login.css'
import { useState } from 'react'
import axios from 'axios'
const Login = () => {

    const login_URL = 'http://127.0.0.1:8000/auth/login'
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
                console.log("Login successful", "success: ", response.data.success, "token: ", response.data.token, "admin: ", response.data.admin)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('admin', response.data.admin)
            } else {
                console.log("Login failed: ", "error: ", response.data.error, "success: ", response.data.success)
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
            <input type="text" onChange={e => setUsername(e.target.value)} /><br />
            <label>Password:</label>
            <input type="password" onChange={e => setPassword(e.target.value)} /><br />
            <button className='LoginButton' onClick={login}>Login</button>
            <label className="newUser"> New User?
                <a className="register" href="/new-user-registration" > Register</a>
            </label>
        </div>
    )
}
export default Login