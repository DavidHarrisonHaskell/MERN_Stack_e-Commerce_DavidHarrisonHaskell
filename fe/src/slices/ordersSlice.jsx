import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "idle",
    error: null,
};

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

export const updateOrder = (order) => async dispatch => {
    const { _id: id } = order;
    dispatch(updateOrderStart({ id }));
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.put(`http://127.0.0.1:8000/admin/orders/${id}`, order, {
            headers: {
                token: token,
            },
        });
        dispatch(updateOrderSuccess(response.data.order));
    }
    catch (error) {
        dispatch(updateOrderFailure(error.message));
    }
}

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
        updateOrderStart: state => {
            state.status = "loading";
        },
        updateOrderSuccess: (state, action) => {
            state.status = "succeeded";
            state.items = state.items.map(order => {
                if (order._id === action.payload._id) {
                    return action.payload;
                }
                return order;
            });
        },
        updateOrderFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    },
});

export const {
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailure
} = ordersSlice.actions;



export default ordersSlice.reducer;

