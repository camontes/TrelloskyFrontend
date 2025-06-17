import { configureStore } from "@reduxjs/toolkit";
import { authReducer, loginUser, logout } from "./slices/authSlice";
import { projectsReducer } from "./slices/projectSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        projects: projectsReducer
    },
});

export {store,loginUser, logout};

export * from './thunks/fetchProjects'

export type RootState = ReturnType<typeof store.getState>;