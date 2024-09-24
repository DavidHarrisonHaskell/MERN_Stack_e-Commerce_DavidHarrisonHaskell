import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
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
        }
    }
})

export const {fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure} = categoriesSlice.actions

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

export default categoriesSlice.reducer;