import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchUserOrders = ({ id }) => async dispatch => {
    dispatch(fetchUserOrdersStart())
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/users/${id}/orders`, {
            headers: {
                'token': token
            }
        });
        console.log("URL sent to the server for userOrders: ", `http://127.0.0.1:8000/users/${id}/orders`)
        console.log("response.data for userOrders: ", response.data)
        console.log("response.data.userOrders: ", response.data.userOrders)
        dispatch(fetchUserOrdersSuccess(response.data))
    } catch (error) {
        dispatch(fetchUserOrdersFailure(error.message))
    }
}
// TODO: add another function to update the user's orders
const userOrdersSlice = createSlice({
    name: 'userOrders',
    initialState,
    reducers: {
        fetchUserOrdersStart(state) {
            state.status = 'loading';
        },
        fetchUserOrdersSuccess(state, action) {
            state.status = 'succeeded';
            state.items = action.payload.userOrders;
        },
        fetchUserOrdersFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    fetchUserOrdersStart,
    fetchUserOrdersSuccess,
    fetchUserOrdersFailure
} = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
