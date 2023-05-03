import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const loaderSlice = createSlice({
    name: "loader",
    initialState: false,
    reducers: {
        setLoader: (state, action) => {
            return action.payload
        },
    },
})

export const {setLoader} =  loaderSlice.actions;

export default loaderSlice.reducer;