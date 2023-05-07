// import { privateApi, publicApi, passwordResetApi } from "./baseApi";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./features/loaderSlice";
import userSlice from "./features/userSlice";
// import userSlice from "./features/userSlice";
// import checkoutSlice from "./features/checkoutSlice";
 const store = configureStore({
  reducer: {
    loader: loaderSlice,
    user: userSlice
  },
});

export default store