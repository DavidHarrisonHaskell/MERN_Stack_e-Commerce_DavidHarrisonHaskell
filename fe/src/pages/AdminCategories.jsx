import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();

    const logOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <Navbar /><br />
            <h1>Categories</h1>

            <button onClick={logOut}>Log Out</button>
        </>
    );
}

export default AdminHome;