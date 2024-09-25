import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../slices/categoriesSlice.jsx';
import { fetchOrders } from '../slices/ordersSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';

const AdminHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories.items);
    const categoriesStatus = useSelector(state => state.categories.status);
    const error = useSelector(state => state.categories.error);
    console.log("categories", categories, "ordersStatus", categoriesStatus, "ordersError", error);

    const orders = useSelector(state => state.orders.items);
    const ordersStatus = useSelector(state => state.orders.status);
    const ordersError = useSelector(state => state.orders.error);
    console.log("orders", orders, "ordersStatus", ordersStatus, "ordersError", ordersError);

    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [categoriesStatus, dispatch]);

    useEffect(() => {
        if (ordersStatus === 'idle') {
            dispatch(fetchOrders());
        }
    }, [ordersStatus, dispatch]);

    const logOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <Navbar /><br />
            <h1>Categories</h1>
            {categoriesStatus === 'loading' && <p>Loading...</p>}
            {categoriesStatus === 'failed' && <p>{error}</p>}
            {categoriesStatus === 'succeeded' && categories.map(category => (
                <div key={category._id}>
                    <h2>{category.Category}</h2>
                </div>
            ))}
            <br />

            <h1>Orders</h1>
            {ordersStatus === 'loading' && <p>Loading...</p>}
            {ordersStatus === 'failed' && <p>{ordersError}</p>}
            {ordersStatus === 'succeeded' && orders.map(order => (
                <ul key={order._id}>
                    <li>{order.UserID}</li><br />
                    <li>{order["User First Name"]}</li><br />
                    <div>{order.Orders.map(the_order => {
                        return (
                            <ul key={the_order._id}>
                                <li>{the_order.ProductID}</li><br />
                                <li>{the_order["Product Title"]}</li><br />
                                <li>{the_order.Quantity}</li>
                            </ul>
                        );
                    })}</div><br />
                    <li>{order["Order Date"]}</li><br />
                </ul>
            ))}
            <button onClick={logOut}>Log Out</button>
        </>
    );
}

export default AdminHome;