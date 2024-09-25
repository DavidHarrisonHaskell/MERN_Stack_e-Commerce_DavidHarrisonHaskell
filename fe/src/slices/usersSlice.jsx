import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "idle",
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUsersStart: state => {
            state.status = "loading";
        },
        fetchUsersSuccess: (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        fetchUsersFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions;

export const fetchUsers = () => async dispatch => {
    dispatch(fetchUsersStart());
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/admin/users", {
            headers: {
                token: token,
            },
        });
        dispatch(fetchUsersSuccess(response.data));
    }
    catch (error) {
        dispatch(fetchUsersFailure(error.message));
    }
}

export default usersSlice.reducer;

