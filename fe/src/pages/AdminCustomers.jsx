import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

const AdminCustomers = () => {
    const navigate = useNavigate();

    const logOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <Navbar /><br />
            <h1>Customers</h1>

            <button onClick={logOut}>Log Out</button>
        </>
    );
}

export default AdminCustomers;