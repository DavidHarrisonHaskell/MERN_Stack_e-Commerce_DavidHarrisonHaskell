import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "idle",
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        fetchOrdersStart: state => {
            state.status = "loading";
        },
        fetchOrdersSuccess: (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        fetchOrdersFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = ordersSlice.actions;

export const fetchOrders = () => async dispatch => {
    dispatch(fetchOrdersStart());
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/admin/orders", {
            headers: {
                token: token,
            },
        });
        dispatch(fetchOrdersSuccess(response.data));
    } catch (error) {
        dispatch(fetchOrdersFailure(error.message));
    }
}

export default ordersSlice.reducer;

