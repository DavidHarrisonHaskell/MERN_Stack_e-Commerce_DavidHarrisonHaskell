import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../slices/categoriesSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import './AdminCategories.css';

const AdminHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories.items);
    const categoriesStatus = useSelector(state => state.categories.status);
    const error = useSelector(state => state.categories.error);
    console.log("AdminCategories: categories", categories, "categoriesStatus", categoriesStatus, "error", error);

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
            <div className="adminCategoriesComponent">
                <br />
                {categoriesStatus === 'loading' && <p>Loading...</p>}
                {categoriesStatus === 'failed' && <p>{error}</p>}
                {categoriesStatus === 'succeeded' &&
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
                <button className='logOutAdmin' onClick={logOut}>Log Out</button>

            </div>




        </>
    );
}

export default AdminHome;