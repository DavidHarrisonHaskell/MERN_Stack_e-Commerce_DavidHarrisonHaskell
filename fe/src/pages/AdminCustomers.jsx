import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicTable from "../components/DynamicTable.jsx";
import Button from "react-bootstrap/Button";
import { logout } from '../actions/index.jsx';
import './AdminCustomers.css';

const AdminCustomers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(state => state.products.items);
    const orders = useSelector(state => state.orders.items)
    const users = useSelector(state => state.users.items);
    const nonAdminUsers = users.filter(user => user.admin === false)

    const getUsersInformation = () => { // function works perfectly

        const getUserRegistrationDate = (date) => {
            const registrationDate = new Date(date);
            const day = String(registrationDate.getDate());
            const month = String(registrationDate.getMonth() + 1);
            const year = registrationDate.getFullYear();

            return `${day.padStart(2, '0')}/${month}/${year}`;
        }
        const usersInformation = nonAdminUsers.map(user => {
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
                    "ProductTitle": products.find(p => p._id === product.ProductID).Title,
                    "Quantity": product.Quantity,
                    "OrderDate": order["Order Date"]
                }))
            )
            userInformation["Products Bought"] = productsBought;
            return userInformation;
        })
        return usersInformation;
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

    const logOut = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    }

    return (
        <>
            <Navbar />

            <div className="adminCustomersComponent">
                <h1 className='headerCustomersAdmin'><b>Customers</b></h1>
                <div className="dynamicTableContainer">
                    <DynamicTable
                        source="AdminCustomers"
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
        </>
    );
}

export default AdminCustomers;