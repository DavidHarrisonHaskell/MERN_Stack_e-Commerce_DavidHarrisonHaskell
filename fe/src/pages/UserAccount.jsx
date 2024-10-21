import Navbar from "../components/Navbar"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/index';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

const UserAccount = () => {

    const userAccount = useSelector(state => state.userAccount.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    }

    return (
        <>
            <Navbar /><br />
            <div>
                <h1>User Account</h1>
                <p>First Name: {userAccount["First Name"]}</p>
                <p>Last Name: {userAccount["Last Name"]}</p>
                <p>Username: {userAccount.Username}</p>
                <p>Password: {userAccount.Password}</p>
                <p>
                    Allow Others to See My Orders: 
                    <input 
                        type="checkbox" 
                        checked={userAccount["allowOthersToSeeMyOrders"]} 
                        readOnly
                    />
                </p>
            </div>
            {/* <Button onClick={logOut}>Log Out</Button> */}
        </>
    )
}

export default UserAccount