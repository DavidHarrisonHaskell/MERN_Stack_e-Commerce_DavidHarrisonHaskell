import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../slices/ordersSlice.jsx';
import { fetchProducts } from "../slices/productsSlice.jsx";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import './AdminProducts.css';


const AdminProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector(state => state.orders.items);
    const ordersStatus = useSelector(state => state.orders.status);
    const ordersError = useSelector(state => state.orders.error);
    // console.log("AdminProducts: orders", orders, "ordersStatus", ordersStatus, "ordersError", ordersError);

    const products = useSelector(state => state.products.items);
    const productsStatus = useSelector(state => state.products.status);
    const productsError = useSelector(state => state.products.error);
    // console.log("AdminProducts: products", products, "productsStatus", productsStatus, "productsError", productsError);

    const getProductsInformation = () => {
        const productsInformation = products.map(product => {
            let productInformation = {
                "Product ID": product._id,
                "Title": product.Title,
                "Category": product.Category,
                "Description": product.Description,
                "Price": product.Price,
                "Link to pic": product["Link to pic"],
                "Bought By": []
            }
            let productOrders = orders.filter(order =>
                order.Orders.some(orderProduct => orderProduct.ProductID == product._id)
            );
            productOrders = productOrders.map(order => {
                let the_product_bought = order.Orders.find(orderProduct => orderProduct.ProductID == product._id)
                return {
                    "User ID": order.UserID,
                    "User First Name": order["User First Name"],
                    "ProductID": the_product_bought.ProductID,
                    "Product Title": the_product_bought["Product Title"],
                    "Quantity": the_product_bought.Quantity,
                    "Order Date": order["Order Date"]
                }
            })
            productInformation["Bought By"] = productOrders;
            return productInformation;
        })
        return productsInformation;
    }

    console.log("AdminProducts: getProductsInformation", getProductsInformation());


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
            {ordersStatus === 'loading' && <p>Loading...</p>}
            {productsStatus === 'loading' && <p>Loading...</p>}

            {ordersStatus === 'failed' && <p>{ordersError}</p>}
            {productsStatus === 'failed' && <p>{productsError}</p>}

            {ordersStatus === 'succeeded' && productsStatus === 'succeeded' && (
                <div className="adminProductsComponent">
                    <h1 className='headerProductsAdmin'><b>Products</b></h1>
                    {getProductsInformation().map((productInformation, index) => (
                        <div className="productInformationContainer" key={index}>
                            <div className="leftSideContainerProductAdmin">
                                <span><b>Title: </b><input value={productInformation.Title} readOnly /></span><br /><br />
                                <span><b>Category: </b><input value={productInformation.Category} readOnly /></span><br /><br />
                                <b>Description: </b><br /><textarea className="AdminDescriptionProduct" value={productInformation.Description} readOnly></textarea><br />
                                <Button variant="success">Save</Button>
                            </div>
                            <div>
                                <span><b>Price: </b><input value={productInformation.Price} readOnly /></span><br /><br />
                                <span><b>Link to pic: </b><input value={productInformation["Link to pic"]} readOnly /></span><br /><br />
                                <li>Link to pic: {productInformation["Link to pic"]}</li><br />
                                <div>Bought By: {productInformation["Bought By"].map((the_productInformation, index2) => {
                                    return (
                                        <ul key={index2}>
                                            {/* <li>User ID: {the_productInformation["User ID"]}</li><br /> */}
                                            <li>User First Name: {the_productInformation["User First Name"]}</li><br />
                                            {/* <li>ProductID: {the_productInformation.ProductID}</li><br /> */}
                                            {/* <li>Product Title: {the_productInformation["Product Title"]}</li><br /> */}
                                            <li>Quantity: {the_productInformation.Quantity}</li><br />
                                            <li>productInformation Date: {the_productInformation["Order Date"]}</li>
                                        </ul>
                                    );
                                })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Button variant="secondary" onClick={logOut}>Log Out</Button>
        </>
    );
}

export default AdminProducts;