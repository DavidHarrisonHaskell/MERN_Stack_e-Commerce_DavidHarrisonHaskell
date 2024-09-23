import './NewUserRegistration.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewUserRegistration = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [allowOthersToSeeMyOrders, setAllowOthersToSeeMyOrders] = useState(false);
    const navigate = useNavigate();
    const register_link = 'http://127.0.0.1:8000/auth/register';

    const register = async () => {
        try {
            const response = await axios.post(register_link, {
                "First Name": FirstName,
                "Last Name": LastName,
                "Username": Username,
                "Password": Password,
                "allowOthersToSeeMyOrders": allowOthersToSeeMyOrders
            });
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
            setAllowOthersToSeeMyOrders(false);
            alert(response.data.message);   
            navigate('/');
        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div className="LoginNewUserRegistration">
            <h1>New User Registration</h1>
            <label>First Name:</label>
            <input type="text" onChange={e => setFirstName(e.target.value)} />
            <br />
            <label>Last Name:</label>
            <input type="text" onChange={e => setLastName(e.target.value)} />
            <br />
            <label>Username:</label>
            <input type="text" onChange={e => setUsername(e.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <br />
            <label className='allowOthersToSeeMyOrders'>
                <input
                    type="checkbox"
                    checked={allowOthersToSeeMyOrders}
                    onChange={() => setAllowOthersToSeeMyOrders(!allowOthersToSeeMyOrders)}
                ></input>&nbsp;
                Allow others to see my orders</label>
            <button className='LoginButtonNewUserRegistration' onClick={register}>Create</button>

        </div>
    );
}
export default NewUserRegistration;