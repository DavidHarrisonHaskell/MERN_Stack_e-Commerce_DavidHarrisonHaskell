import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../slices/ordersSlice.jsx';
import { fetchProducts } from "../slices/productsSlice.jsx";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const AdminProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector(state => state.orders.items);
    const ordersStatus = useSelector(state => state.orders.status);
    const ordersError = useSelector(state => state.orders.error);
    console.log("AdminProducts: orders", orders, "ordersStatus", ordersStatus, "ordersError", ordersError);

    const products = useSelector(state => state.products.items);
    const productsStatus = useSelector(state => state.products.status);
    const productsError = useSelector(state => state.products.error);
    console.log("AdminProducts: products", products, "productsStatus", productsStatus, "productsError", productsError);


    useEffect(() => {
        if (ordersStatus === 'idle') {
            dispatch(fetchOrders());
        }
    }, [ordersStatus, dispatch]);

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productsStatus, dispatch]);

    const logOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <Navbar /><br />
            <h1>Products</h1>

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

            <h2>Products</h2>
            {productsStatus === 'loading' && <p>Loading...</p>}
            {productsStatus === 'failed' && <p>{productsError}</p>}
            {productsStatus === 'succeeded' && products.map(product => (
                <ul key={product._id}>
                    <h3>productID: {product._id}</h3>
                    <li>Title: {product.Title}</li>
                    <li>Category: {product.Category}</li>
                    <li>Description: {product.Description}</li>
                    <li>Price: {product.Price}</li>
                    <li>Link to pic: {product["Link to pic"]}</li>
                    <li>CategoryID: {product.CategoryID}</li>
                </ul>
            ))}


            <button onClick={logOut}>Log Out</button>
        </>
    );
}

export default AdminProducts;