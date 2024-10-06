import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

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

export const updateProduct = (product) => async dispatch => {
    const { _id: id } = product
    dispatch(updateProductStart({ id })) // This will set the status to 'loading'
    console.log("product", product)
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('No token found')
        }
        const response = await axios.put(`http://127.0.0.1:8000/admin/products/${id}`, product, {
            headers: {
                'token': token
            }
        });
        console.log("response", response)
        console.log("response.data", response.data)
        dispatch(updateProductSuccess(response.data.product)) // This will set the status to 'succeeded'
    }
    catch (error) {
        dispatch(updateProductFailure(error.message)) // This will set the status to 'failed'
    }
}





const productsSlice = createSlice({ //
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
                },
                updateProductStart: (state, action) => {
                    state.status = 'loading' // This will set the status to 'loading'
                },
                updateProductSuccess: (state, action) => {
                    state.status = 'succeeded' // This will set the status to 'succeeded'
                    state.items = state.items.map(item => {
                        if (item.id === action.payload.id) {
                            return action.payload
                        }
                        return item
                    })
                },
                updateProductFailure: (state, action) => {
                    state.status = 'failed' // This will set the status to 'failed'
                    state.error = action.payload // This will set the error message to the error message returned from the API
                }
            }
        })

        export const {
            fetchProductsStart,
            fetchProductsSuccess,
            fetchProductsFailure,
            updateProductStart,
            updateProductSuccess,
            updateProductFailure
        } = productsSlice.actions



        export default productsSlice.reducer;