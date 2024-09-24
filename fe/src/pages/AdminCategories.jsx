import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../slices/categoriesSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';

const AdminHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories.items);
    const categoriesStatus = useSelector(state => state.categories.status);
    const error = useSelector(state => state.categories.error);

    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [categoriesStatus, dispatch]);

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
            <button onClick={logOut}>Log Out</button>
        </>
    );
}

export default AdminHome;