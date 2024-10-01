import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCategories, updateCategory, addCategory, deleteCategory } from '../slices/categoriesSlice.jsx';
import { fetchOrders } from '../slices/ordersSlice.jsx';
import { fetchProducts } from '../slices/productsSlice.jsx';
import { fetchUsers } from '../slices/usersSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Button from "react-bootstrap/Button";
import { logout } from '../actions/index.jsx';
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

    const [editingCategory, setEditingCategory] = useState(null);
    const [updatedCategoryName, setUpdatedCategoryName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');

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
        dispatch(logout());
        navigate('/login');
    }

    const handleEditCategory = (categoryId, currentName) => {
        setEditingCategory(categoryId);
        setUpdatedCategoryName(currentName);
    }

    const handleSave = (categoryId) => {
        dispatch(updateCategory({ id: categoryId, name: updatedCategoryName }));
        setEditingCategory(null);
        console.log("Category updated", categoryId, updatedCategoryName);
    }

    const handleChange = (e) => {
        setUpdatedCategoryName(e.target.innerText);
        // console.log("updatedCategoryName", updatedCategoryName);
    };

    const handleAddNewCategory = () => {
        dispatch(addCategory({ Category: newCategoryName }));
        setNewCategoryName('');
        console.log("New category added", newCategoryName);
    }


    const handleDeleteCategory = (categoryID) => {
        dispatch(deleteCategory({ id: categoryID }));
        setEditingCategory(null);
        console.log("Category deleted", categoryID);
    }


    return (
        <>
            <Navbar /><br />
            <div className="adminCategoriesComponent">
                <br />
                {categoriesStatus === 'loading' && <p>Loading...</p>}
                {categoriesStatus === 'failed' && <p>{console.log(error)}</p>}
                {ordersStatus === 'loading' && <p>Loading...</p>}
                {ordersStatus === 'failed' && <p>{console.log(ordersError)}</p>}
                {productsStatus === 'loading' && <p>Loading...</p>}
                {productsStatus === 'failed' && <p>{console.log(productsError)}</p>}
                {usersStatus === 'loading' && <p>Loading...</p>}
                {usersStatus === 'failed' && <p>{console.log(usersError)}</p>}
                {categoriesStatus === 'succeeded' && ordersStatus === 'succeeded' && productsStatus === 'succeeded' && usersStatus === 'succeeded' &&
                    <>
                        <h1 className='headerCategoriesAdmin'><b>Categories</b></h1>
                        <div className='categoriesContainerAdmin'>

                            {categories.map(category => (
                                <div className='categoryContainerAdmin' key={category._id}>
                                    {editingCategory === category._id ? (
                                        <>
                                            <h2
                                                contentEditable
                                                suppressContentEditableWarning
                                                // onBlur={() => handleSave(category._id)}
                                                onInput={handleChange}
                                                className="categoryNameAdmin"
                                            >
                                                {category.Category}
                                            </h2>
                                            <button className="updateCategoryButton" onClick={() => handleSave(category._id)}>Update</button>
                                            <button className="deleteCategoryButton" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <h2 onClick={() => handleEditCategory(category._id, category.Category)}>{category.Category}</h2>
                                            <button className="updateCategoryButton">Update</button>
                                            <button className="deleteCategoryButton" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                                        </>

                                    )}

                                </div>
                            ))}
                            <div className="newCategoryContainerAdmin">
                                <input
                                    type="text"
                                    placeholder="Add new category"
                                    className="newCategoryInputAdmin"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                                <button className="newCategoryButtonAdmin" onClick={handleAddNewCategory}>Add</button>
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