import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: state => { 
            state.status = 'loading' // This will set the status to 'loading'
        },
        fetchProductsSuccess: (state, action) => {
            state.status = 'succeeded' // This will set the status to 'succeeded'
            state.items = action.payload // This will set the items to the products returned from the API
        },
        fetchProductsFailure: (state, action) => { 
            state.status = 'failed' // This will set the status to 'failed'
            state.error = action.payload // This will set the error message to the error message returned from the API
        }
    }
})

export const {fetchProductsStart, fetchProductsSuccess, fetchProductsFailure} = productsSlice.actions

export const fetchProducts = () => async dispatch => {
    dispatch(fetchProductsStart()) // This will set the status to 'loading'
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/admin/products', {
            headers: {
            'token': token
            }
        });
        dispatch(fetchProductsSuccess(response.data)) // This will set the status to 'succeeded'
    }
    catch (error) {
        dispatch(fetchProductsFailure(error.message)) // This will set the status to 'failed'
    }
}

export default productsSlice.reducer;