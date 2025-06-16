import { configureStore } from "@reduxjs/toolkit";
import { authReducer, loginUser, logout } from "./slices/authSlice";

const store = configureStore({
    reducer:{
        auth: authReducer
    },
});

export {store,loginUser, logout};

export type RootState = ReturnType<typeof store.getState>;