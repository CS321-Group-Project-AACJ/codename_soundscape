import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "../features/appConfig/appConfigSlice.js";

export const store = configureStore({
    reducer: {
        appConfig: appConfigReducer,
    },
});
