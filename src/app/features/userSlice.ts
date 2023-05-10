import { User } from "@prisma/client";
import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
    name: "User",
    initialState: {} as User,

    reducers: {
        authenticationSuccess: (state, action) => {
             return action.payload
        },
        authenticationFailed: (state, action) => {
            return action.payload
        },
        logout: () => {
             Cookies.remove('userToken')
             window.location.replace('/')
        }
    },
})

export const {authenticationSuccess, authenticationFailed, logout } =  userSlice.actions;

export const getUser = (state: any) => state.user;


export default userSlice.reducer;