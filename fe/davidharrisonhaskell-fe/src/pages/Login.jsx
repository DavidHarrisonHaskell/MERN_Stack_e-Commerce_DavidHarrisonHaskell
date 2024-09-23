import './Login.css'
const Login = () => {
    return (
        <div className='Login'>
            <label className="heading">Next Generation E-Commerce</label>
            <br />
             <label>Username:</label>
            <input type="text" /><br />
            <label>Password:</label>
            <input type="password"/><br />
            <button className='LoginButton'>Login</button>
            <label className="newUser"> New User? <a className="register" href='/register'>Register</a></label>
        </div>
    )
}
export default Login