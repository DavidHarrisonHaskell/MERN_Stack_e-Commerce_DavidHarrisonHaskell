import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchUserAccount = ({ id }) => async dispatch => {
    dispatch(fetchUserAccountStart())
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/users/${id}`, {
            headers: {
                'token': token
            }
        });
        dispatch(fetchUserAccountSuccess(response.data))
    } catch (error) {
        dispatch(fetchUserAccountFailure(error.message))
    }
}

export const updateUserAccount = ({ id, user }) => async dispatch => {
    dispatch(fetchUserAccountStart())
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.put(`http://127.0.0.1:8000/users/${id}`, user, {
            headers: {
                'token': token
            }
        });
        dispatch(fetchUserAccountSuccess(response.data))
    } catch (error) {
        dispatch(fetchUserAccountFailure(error.message))
    }
}

const userAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        fetchUserAccountStart(state) {
            state.status = 'loading';
        },
        fetchUserAccountSuccess(state, action) {
            state.status = 'succeeded';
            state.items = action.payload.user;
        },
        fetchUserAccountFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        updateUserAccountStart(state) {
            state.status = 'loading';
        },
        updateUserAccountSuccess(state, action) {
            state.status = 'succeeded';
            state.items = action.payload.user;
        },
        updateUserAccountFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    fetchUserAccountStart,
    fetchUserAccountSuccess,
    fetchUserAccountFailure,
    updateUserAccountStart,
    updateUserAccountSuccess,
    updateUserAccountFailure
} = userAccountSlice.actions;

export default userAccountSlice.reducer;