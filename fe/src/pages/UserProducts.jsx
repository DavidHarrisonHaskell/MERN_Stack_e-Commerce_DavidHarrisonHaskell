import Navbar from "../components/Navbar"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../slices/userProductsSlice';
import { fetchUserOrders } from '../slices/userOrdersSlice';
import { logout } from '../actions/index';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



const UserProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // load all redux states
    const userProducts = useSelector(state => state.userProducts.items);
    const userProductsStatus = useSelector(state => state.userProducts.status);
    const error = useSelector(state => state.userProducts.error);

    const userOrdersStatus = useSelector(state => state.userOrders.status);
    const userOrdersError = useSelector(state => state.userOrders.error);


    useEffect(() => {
        // TODO: get user Id from sessionStorage and pass it to fetchUserProducts
        const id = sessionStorage.getItem('id').toString();
        console.log("sessionstorage id: ", id)

        if (userProductsStatus === 'idle') {
            dispatch(fetchUserProducts({ id }));
        }
        if (userOrdersStatus === 'idle') {
            dispatch(fetchUserOrders({ id }));
        }
    }, [userProductsStatus, userOrdersStatus, dispatch]);

    const logOut = () => {
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    }


    return (
        <>
            <Navbar /><br />
            <div>
                {userProductsStatus === 'loading' && <h1>Loading...</h1>}
                {userProductsStatus === 'failed' && <p>{console.log(error)}</p>}
                {userProductsStatus === 'succeeded' && userProducts.length === 0 && <h1>No products found</h1>}
                {userOrdersStatus === 'loading' && <h1>Loading...</h1>}
                {userOrdersStatus === 'failed' && <p>{console.log(userOrdersError)}</p>}
                {userProductsStatus === 'succeeded' && userProducts.map(product => (
                    <div key={product.ProductID}>
                        <h1>{product["Product Title"]}</h1>
                        <p>{product.Category}</p>
                        <p>{product.Description}</p>
                        <p>{product.Price}</p>
                        <p>{product["Link to pic"]}</p>
                        <p>{product["Number of Units Sold"]}</p>
                    </div>
                ))}
                <Button onClick={logOut}>Logout</Button>
            </div>
        </>
    )
}

export default UserProducts