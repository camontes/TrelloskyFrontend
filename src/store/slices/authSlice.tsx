import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  image: string
  // agrega más campos si necesitas
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const userJson = localStorage.getItem('user');
const initialUser =  userJson && userJson !== "undefined" ? JSON.parse(userJson) : null;

const initialState: AuthState = {
  user: initialUser,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginUser: (state, action) => {
            state.user = action.payload.data;
            state.token = action.payload.token;

            localStorage.setItem('user', JSON.stringify(action.payload.data));
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    }
}
);

export const { loginUser, logout } = authSlice.actions;
export const authReducer =  authSlice.reducer;