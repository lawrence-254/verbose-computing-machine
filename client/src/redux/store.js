import { configureStore } from '@reduxjs/toolkit';
import userReducer from './actions/authActions';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});