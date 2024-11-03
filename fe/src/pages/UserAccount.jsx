import Navbar from "../components/Navbar"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import './UserAccount.css';
import { useEffect, useState } from 'react';
import { updateUserAccount } from '../slices/userAccountSlice';

const UserAccount = () => {
    const [editableFirstName, setEditableFirstName] = useState('');
    const [editableLastName, setEditableLastName] = useState('');
    const [editableUsername, setEditableUsername] = useState('');
    const [editablePassword, setEditablePassword] = useState('');
    const [editableAllowOthersToSeeMyOrders, setEditableAllowOthersToSeeMyOrders] = useState(false);

    const userAccount = useSelector(state => state.userAccount.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect function for initializing values
    useEffect(() => {
        setEditableFirstName(userAccount["First Name"]);
        setEditableLastName(userAccount["Last Name"]);
        setEditableUsername(userAccount.Username);
        setEditablePassword(userAccount.Password);
        setEditableAllowOthersToSeeMyOrders(userAccount["allowOthersToSeeMyOrders"]);
    }, [userAccount]);


    const saveAccountInformation = () => {
        // dispatch an action to update the user account information
        const id = userAccount._id;
        const user = {
            "First Name": editableFirstName,
            "Last Name": editableLastName,
            "Username": editableUsername,
            "Password": editablePassword,
            "allowOthersToSeeMyOrders": editableAllowOthersToSeeMyOrders
        }
        dispatch(updateUserAccount({ id, user }))
    }

    return (
        <>
            <Navbar />
            <div className="userAccountWrapper">
                <div className="userAccount">
                    <label>First Name: </label><br />
                    <input
                        type="text"
                        value={editableFirstName}
                        onChange={(e) => setEditableFirstName(e.target.value)}
                    /><br /><br />
                    <label>Last Name: </label><br />
                    <input
                        type="text"
                        value={editableLastName}
                        onChange={(e) => setEditableLastName(e.target.value)}
                    /><br /><br />
                    <label>Username: </label><br />
                    <input
                        type="text"
                        value={editableUsername}
                        onChange={(e) => setEditableUsername(e.target.value)}
                    /><br /><br />
                    <label>Password: </label><br />
                    <input
                        type="text"
                        value={editablePassword}
                        onChange={(e) => setEditablePassword(e.target.value)}
                    /><br /><br />
                    <label>Allow Others to See My Orders:</label><br />
                    <input
                        type="checkbox"
                        checked={editableAllowOthersToSeeMyOrders}
                        onChange={() => setEditableAllowOthersToSeeMyOrders(!editableAllowOthersToSeeMyOrders)}
                    /><br /><br />
                    <Button variant="success" onClick={saveAccountInformation}>Save</Button>
                </div>
            </div>
        </>
    )
}

export default UserAccount