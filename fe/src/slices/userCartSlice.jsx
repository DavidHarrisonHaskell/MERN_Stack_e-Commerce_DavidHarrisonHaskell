import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

const userCartSlice = createSlice({
    name: 'userCart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { productId } = action.payload;
            if (state.items[productId]) {
                state.items[productId] += 1;
            } else {
                state.items[productId] = 1;
            }
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload;
            if (state.items[productId]) {
                state.items[productId] -= 1;
                if (state.items[productId] < 0) {
                    state.items[productId] = 0;
                }
            }
        },
        setCartQuantity: (state, action) => {
            const { productId } = action.payload;
            if (state.items[productId]) {
                state.items[productId] = 0;
            }
        },
        initializeCart: (state, action) => {
            const { productsObject } = action.payload;
            state.items = productsObject;
        }
    }
});

export const { addToCart, removeFromCart, setCartQuantity, initializeCart } = userCartSlice.actions;

export default userCartSlice.reducer;
