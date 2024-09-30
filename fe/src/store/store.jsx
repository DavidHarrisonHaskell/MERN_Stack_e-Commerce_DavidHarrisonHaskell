import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import categoriesReducer from '../slices/categoriesSlice';
import ordersReducer from '../slices/ordersSlice';
import productsReducer from '../slices/productsSlice';
import usersReducer from '../slices/usersSlice';
import rootSaga from '../sagas/index';
import { CLEAR_STATE } from '../actions/actions';


const persistConfig = {
    key: 'root',
    storage,
};

const appReducer = combineReducers({
    categories: categoriesReducer,
    orders: ordersReducer,
    products: productsReducer,
    users: usersReducer
});

const rootReducer = (state, action) => {
    if (action.type === CLEAR_STATE) {
        state = undefined;
    }
    return appReducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };