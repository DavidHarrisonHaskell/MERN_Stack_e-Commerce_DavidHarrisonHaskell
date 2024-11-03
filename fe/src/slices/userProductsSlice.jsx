import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchUserProducts = ({ id }) => async dispatch => {
    dispatch(fetchUserProductsStart())
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/users/${id}/products`, {
            headers: {
                'token': token
            }
        });
        dispatch(fetchUserProductsSuccess(response.data))
    } catch (error) {
        dispatch(fetchUserProductsFailure(error.message))
    }
}

const userProductsSlice = createSlice({
    name: 'userProducts',
    initialState,
    reducers: {
        fetchUserProductsStart(state) {
            state.status = 'loading';
        },
        fetchUserProductsSuccess(state, action) {
            state.status = 'succeeded';
            state.items = action.payload.products;
        },
        fetchUserProductsFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    fetchUserProductsStart,
    fetchUserProductsSuccess,
    fetchUserProductsFailure
} = userProductsSlice.actions;

export default userProductsSlice.reducer;
