// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import chatReducer from './chatSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
    },
});

export default store;
