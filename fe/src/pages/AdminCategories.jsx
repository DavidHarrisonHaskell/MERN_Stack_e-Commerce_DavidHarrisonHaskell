import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../slices/categoriesSlice.jsx';
import { fetchOrders } from '../slices/ordersSlice.jsx';
import { fetchProducts } from '../slices/productsSlice.jsx';
import { fetchUsers } from '../slices/usersSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Button from "react-bootstrap/Button";
import './AdminCategories.css';

const AdminHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // load all redux states
    const categories = useSelector(state => state.categories.items);
    const categoriesStatus = useSelector(state => state.categories.status);
    const error = useSelector(state => state.categories.error);

    const ordersStatus = useSelector(state => state.orders.status);
    const ordersError = useSelector(state => state.orders.error);

    const productsStatus = useSelector(state => state.products.status);
    const productsError = useSelector(state => state.products.error);

    const usersStatus = useSelector(state => state.users.status);
    const usersError = useSelector(state => state.users.error);

    // console.log("AdminCategories: categories", categories, "categoriesStatus", categoriesStatus, "error", error);

    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories());
        }
        if (ordersStatus === 'idle') {
            dispatch(fetchOrders());
        }
        if (productsStatus === 'idle') {
            dispatch(fetchProducts());
        }
        if (usersStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [categoriesStatus, dispatch]);

    const logOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <Navbar /><br />
            <div className="adminCategoriesComponent">
                <br />
                {categoriesStatus === 'loading' && <p>Loading...</p>}
                {categoriesStatus === 'failed' && <p>{error}</p>}
                {ordersStatus === 'loading' && <p>Loading...</p>}
                {ordersStatus === 'failed' && <p>{ordersError}</p>}
                {productsStatus === 'loading' && <p>Loading...</p>}
                {productsStatus === 'failed' && <p>{productsError}</p>}
                {categoriesStatus === 'succeeded' && ordersStatus === 'succeeded' && productsStatus === 'succeeded' &&
                    <>
                        <h1 className='headerCategoriesAdmin'><b>Categories</b></h1>
                        <div className='categoriesContainerAdmin'>

                            {categories.map(category => (
                                <div className='categoryContainerAdmin' key={category._id}>
                                    <h2>{category.Category}</h2>
                                </div>
                            ))}
                            <div className="newCategoryContainerAdmin">
                                <input
                                    type="text"
                                    placeholder="Add new category"
                                    className="newCategoryInputAdmin"
                                />
                                <button className="newCategoryButtonAdmin">Add</button>
                            </div>
                        </div>
                    </>
                }
                <Button variant="secondary" onClick={logOut}>Log Out</Button>

            </div>




        </>
    );
}

export default AdminHome;