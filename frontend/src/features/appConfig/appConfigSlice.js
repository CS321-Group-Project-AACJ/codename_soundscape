import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokens: {
        accessToken: localStorage.getItem("accessToken") || "",
        refreshToken: localStorage.getItem("refreshToken") || "",
        expiresIn: JSON.parse(localStorage.getItem("expiresIn")) || 0,
        timestamp: JSON.parse(localStorage.getItem("timestamp")) || 0,
    },
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    location: {
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    },
    theme: "light",
};

export const appConfigSlice = createSlice({
    name: "appConfig",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.tokens.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.tokens.refreshToken = action.payload;
        },
        setExpiresInToken: (state, action) => {
            state.tokens.expiresIn = action.payload;
        },
        setTimestamp: (state, action) => {
            state.tokens.timestamp = action.payload;
        },
        removeAccessToken: (state, action) => {
            state.tokens.accessToken = action.payload;
        },
        removeRefreshToken: (state, action) => {
            state.tokens.refreshToken = action.payload;
        },
        removeExpiresInToken: (state, action) => {
            state.tokens.expiresIn = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        toggleIsLoggedIn: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setTheme: (state, action) => {
            if (action.payload === "light" || action.payload === "dark") {
                state.theme = action.payload;
            } else {
                state.theme = "light";
            }
        },
        toggleTheme: (state) => {
            if (state.theme === "light") {
                state.theme = "dark";
            } else {
                state.theme = "light";
            }
        },
    },
});

export const {
    setAccessToken,
    setRefreshToken,
    setExpiresInToken,
    setTimestamp,
    removeAccessToken,
    removeRefreshToken,
    removeExpiresInToken,
    setIsLoggedIn,
    toggleIsLoggedIn,
    setLocation,
    setTheme,
    toggleTheme,
} = appConfigSlice.actions;
export default appConfigSlice.reducer;