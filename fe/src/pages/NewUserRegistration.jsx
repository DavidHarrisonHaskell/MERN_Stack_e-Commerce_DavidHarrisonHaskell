import './NewUserRegistration.css';
import { useState } from "react";

const NewUserRegistration = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [AllowOtherToSeeMyOrders, setAllowOtherToSeeMyOrders] = useState(false);

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
            <label className='AllowOtherToSeeMyOrders'>
                <input
                    type="checkbox"
                    checked={AllowOtherToSeeMyOrders}
                    onChange={() => setAllowOtherToSeeMyOrders(!AllowOtherToSeeMyOrders)}
                ></input>&nbsp;
                Allow others to see my orders</label>
            <button className='LoginButtonNewUserRegistration' onClick={() => setAllowOtherToSeeMyOrders(!AllowOtherToSeeMyOrders)}>Create</button>

        </div>
    );
}
export default NewUserRegistration;