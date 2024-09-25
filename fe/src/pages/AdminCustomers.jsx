import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../slices/ordersSlice.jsx';
import { fetchUsers } from "../slices/usersSlice.jsx";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const AdminCustomers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const getUsersInformation = () => { // function works perfectly
        const orders = useSelector(state => state.orders.items)
        let users = useSelector(state => state.users.items);
        users = users.filter(user => user.admin === false)

        const allUsersInformation = users.map(user => {
            let userInformation = {
                "User ID": user._id,
                "First Name": user["First Name"],
                "Last Name": user["Last Name"],
                "allowOthersToSeeMyOrders": user.allowOthersToSeeMyOrders,
                "Products Bought": []
            }
            // get all the orders of the user
            const userOrders = orders.filter(order => order.UserID == user._id);
            //find all the products bought by the user
            let productsBought = userOrders.flatMap(order =>
                order.Orders.map(product => ({
                    "ProductID": product.ProductID,
                    "Product Title": product["Product Title"],
                    "Quantity": product.Quantity,
                    "Order Date": order["Order Date"]
                }))
            )
            userInformation["Products Bought"] = productsBought;
            return userInformation;
        })
        return allUsersInformation;
    }

    const orders = useSelector(state => state.orders.items);
    const ordersStatus = useSelector(state => state.orders.status);
    const ordersError = useSelector(state => state.orders.error);
    console.log("AdminCustomers: orders", orders, "ordersStatus", ordersStatus, "ordersError", ordersError);

    const users = useSelector(state => state.users.items);
    const usersStatus = useSelector(state => state.users.status);
    const usersError = useSelector(state => state.users.error);
    console.log("AdminCustomers: users", users, "usersStatus", usersStatus, "usersError", usersError);

    console.log("getUsersInformation", getUsersInformation()); //works fine

    useEffect(() => {
        if (ordersStatus === 'idle') {
            dispatch(fetchOrders());
        }
    }, [ordersStatus, dispatch]);

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [usersStatus, dispatch]);

    const logOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <Navbar /><br />
            <h1>Customers</h1>

            <h2>Orders</h2>
            {ordersStatus === 'loading' && <p>Loading...</p>}
            {ordersStatus === 'failed' && <p>{ordersError}</p>}
            {ordersStatus === 'succeeded' && orders.map(order => (
                <ul key={order._id}>
                    <h3>UserID: {order.UserID}</h3><br />
                    <li>User First Name: {order["User First Name"]}</li><br />
                    <div>Orders: {order.Orders.map(the_order => {
                        return (
                            <ul key={the_order._id}>
                                <li>ProductID: {the_order.ProductID}</li><br />
                                <li>Product Title: {the_order["Product Title"]}</li><br />
                                <li>Quantity: {the_order.Quantity}</li>
                            </ul>
                        );
                    })}</div><br />
                    <li>Order Date: {order["Order Date"]}</li><br />
                </ul>
            ))}

            <h2>Users</h2>
            {usersStatus === 'loading' && <p>Loading...</p>}
            {usersStatus === 'failed' && <p>{usersError}</p>}
            {usersStatus === 'succeeded' && users.map(user => (
                <ul key={user._id}>
                    <br />

                    <h3>userID: {user._id}</h3><br />
                    <li>User First Name: {user["First Name"]}</li><br />
                    <li>User Last Name: {user["Last Name"]}</li><br />
                    <li>Username: {user.Username}</li><br />
                    <li>Password: {user.Password}</li>
                    <li>admin: {user.admin.toString()}</li><br />
                    {user.allowOthersToSeeMyOrders && <li>allowOthersToSeeMyOrders: {user.allowOthersToSeeMyOrders.toString()}</li>}
                    {user["Registration Date"] && <li>Registration Date: {user["Registration Date"]}</li>}
                </ul>
            ))}

            <button onClick={logOut}>Log Out</button>
        </>
    );
}

export default AdminCustomers;