import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const fontSlice = createSlice({
    name: "font",
    initialState: false,
    reducers: {
        setFont: (state, action) => {
            return action.payload
        },
    },
})

export const {setFont} =  fontSlice.actions;

export default fontSlice.reducer;