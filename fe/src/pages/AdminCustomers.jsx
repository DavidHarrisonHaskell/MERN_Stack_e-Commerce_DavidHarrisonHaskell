import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../slices/ordersSlice.jsx';
import { fetchUsers } from "../slices/usersSlice.jsx";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicTable from "../components/DynamicTable.jsx";
import Button from "react-bootstrap/Button";
import './AdminCustomers.css';

const AdminCustomers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector(state => state.orders.items)
    const ordersStatus = useSelector(state => state.orders.status);
    const ordersError = useSelector(state => state.orders.error);

    let users = useSelector(state => state.users.items);
    users = users.filter(user => user.admin === false)
    const usersStatus = useSelector(state => state.users.status);
    const usersError = useSelector(state => state.users.error);

    const getUsersInformation = () => { // function works perfectly


        const getUserRegistrationDate = (date) => {
            const registrationDate = new Date(date);
            const day = String(registrationDate.getDate());
            const month = String(registrationDate.getMonth() + 1);
            const year = registrationDate.getFullYear();

            return `${day.padStart(2, '0')}/${month}/${year}`;
        }
        const allUsersInformation = users.map(user => {
            let userInformation = {
                "User ID": user._id,
                "First Name": user["First Name"],
                "Last Name": user["Last Name"],
                "Registration Date": getUserRegistrationDate(user["Registration Date"]),
                "allowOthersToSeeMyOrders": user.allowOthersToSeeMyOrders,
                "Products Bought": []
            }
            // get all the orders of the user
            const userOrders = orders.filter(order => order.UserID == user._id);
            //find all the products bought by the user
            let productsBought = userOrders.flatMap(order =>
                order.Orders.map(product => ({
                    "ProductID": product.ProductID,
                    "ProductTitle": product["Product Title"],
                    "Quantity": product.Quantity,
                    "OrderDate": order["Order Date"]
                }))
            )
            userInformation["Products Bought"] = productsBought;
            return userInformation;
        })
        return allUsersInformation;
    }


    const getUsersInformationForSubTable = (ProductsBought) => {
        return ProductsBought.map(product => {
            return {
                "Product Title": product["ProductTitle"],
                "Quantity": product["Quantity"],
                "Order Date": product["OrderDate"]
            }
        })
    }

    const getUsersInformationForTable = () => {
        const usersInformation = getUsersInformation();
        const data = usersInformation.map(user => {
            return {
                "fullName": user["First Name"] + " " + user["Last Name"],
                "joinedAt": user["Registration Date"],
                "productsBought": getUsersInformationForSubTable(user["Products Bought"])
            }
        })
        return data;
    }




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
            <Navbar />
            {ordersStatus === 'loading' && <p>Loading...</p>}
            {ordersStatus === 'failed' && <p>{ordersError}</p>}
            {usersStatus === 'loading' && <p>Loading...</p>}
            {usersStatus === 'failed' && <p>{usersError}</p>}
            {ordersStatus === 'succeeded' && usersStatus === 'succeeded' && (
                <div className="adminCustomersComponent">
                    <div className="dynamicTableContainer">
                        <DynamicTable
                            columns={[
                                { key: "fullName", label: "Full Name" },
                                { key: "joinedAt", label: "Joined At" },
                                { key: "productsBought", label: "Products Bought" }
                            ]}
                            data={getUsersInformationForTable()}
                            subColumns={[
                                { key: "Product Title", label: "Product Title" },
                                { key: "Quantity", label: "Quantity" },
                                { key: "Order Date", label: "Order Date" }
                            ]}
                        />
                    </div>
                    <br />
                    <Button variant="secondary" onClick={logOut}>Log Out</Button>
                </div>
            )}
        </>
    );
}

export default AdminCustomers;