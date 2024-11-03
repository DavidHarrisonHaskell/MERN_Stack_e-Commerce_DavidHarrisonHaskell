import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
}


export const fetchCategories = () => async dispatch => {
    dispatch(fetchCategoriesStart()) // This will set the status to 'loading'
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/admin/categories', {
            headers: {
                'token': token
            }
        });
        dispatch(fetchCategoriesSuccess(response.data)) // This will set the status to 'succeeded'
    } catch (error) {
        dispatch(fetchCategoriesFailure(error.message)) // This will set the status to 'failed'
    }
}


export const updateCategory = ({ id, name }) => async dispatch => {
    dispatch(updateCategoryStart())
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.put(`http://127.0.0.1:8000/admin/categories/${id}`, { "Category": name }, {
            headers: {
                'token': token
            }
        });
        dispatch(updateCategorySuccess(response.data))
    } catch (error) {
        dispatch(updateCategoryFailure(error.response))
    }
}

export const addCategory = ({ Category }) => async dispatch => {
    dispatch(addCategoryStart())
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/admin/categories', { "Category": Category }, {
            headers: {
                'token': token
            }
        });
        dispatch((addCategorySuccess(response.data.category)))
    }
    catch (error) {
        dispatch(addCategoryFailure(error.response))
    }
}

export const deleteCategory = ({ id }) => async dispatch => {
    dispatch(deleteCategoryStart())
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:8000/admin/categories/${id}`, {
            headers: {
                'token': token
            }
        });
        dispatch(deleteCategorySuccess(response.data))
    } catch (error) {
        dispatch(deleteCategoryFailure(error.response))
    }
}




const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchCategoriesStart: state => {
            state.status = 'loading'
        },
        fetchCategoriesSuccess: (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        },
        fetchCategoriesFailure: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        updateCategoryStart: state => {
            state.status = 'loading'
        },
        updateCategorySuccess: (state, action) => {
            state.status = 'succeeded'
            state.items = state.items.map(category => {
                if (category._id === action.payload.category._id) {
                    return action.payload.category
                }
                return category
            })
        },
        updateCategoryFailure: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        addCategoryStart: state => {
            state.status = 'loading'
        },
        addCategorySuccess: (state, action) => {
            state.status = 'succeeded'
            state.items.push(action.payload)
        },
        addCategoryFailure: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        deleteCategoryStart: state => {
            state.status = 'loading'
        },
        deleteCategorySuccess: (state, action) => {
            state.status = 'succeeded'
            state.items = state.items.filter(category => category._id !== action.payload.category._id)
        },
        deleteCategoryFailure: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFailure,
    addCategoryStart,
    addCategorySuccess,
    addCategoryFailure,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure
} = categoriesSlice.actions


export default categoriesSlice.reducer;