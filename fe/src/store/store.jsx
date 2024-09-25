import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../slices/categoriesSlice';
import ordersReducer from '../slices/ordersSlice';
// import productsReducer from '../slices/productsSlice';
// import usersReducer from '../slices/usersSlice';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        orders: ordersReducer,
        // products: productsReducer,
        // users: usersReducer
    }
});

export default store;