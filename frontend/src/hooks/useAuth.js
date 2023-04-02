import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccessToken,
    setRefreshToken,
    setExpiresInToken,
    removeAccessToken,
    removeRefreshToken,
    removeExpiresInToken,
    setIsLoggedIn,
} from "../features/appConfig/appConfigSlice.js";

export default function useAuth(code) {
    const location = useSelector((state) => state.appConfig.location);

    const accessToken = useSelector(
        (state) => state.appConfig.tokens.accessToken
    );
    const refreshToken = useSelector(
        (state) => state.appConfig.tokens.refreshToken
    );
    const expiresIn = useSelector((state) => state.appConfig.tokens.expiresIn);

    const isLoggedIn = useSelector((state) => state.appConfig.isLoggedIn);

    const dispatch = useDispatch();

    async function initializeTokens() {
        try {
            const response = await axios.post(
                "http://localhost:3001/auth/login",
                {
                    code,
                }
            );
            console.log(response.data);
            window.history.pushState({}, null, "/");

            const { accessToken, refreshToken, expiresIn } = response.data;
            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
            dispatch(setExpiresInToken(expiresIn));
            // dispatch(setExpiresInToken(61));
        } catch (error) {
            window.location = "/";
        }
    }

    async function registerAccount() {
        try {
            console.log(location);
            const registerResponse = await axios.post(
                "http://localhost:3001/accounts/register",
                {
                    accessToken,
                    longitude: location.coordinates.lng,
                    latitude: location.coordinates.lat,
                }
            );
            console.log(registerResponse);
            dispatch(setIsLoggedIn(true));
        } catch (error) {
            window.location = "/";
        }
    }

    async function refreshAuth() {
        try {
            const response = await axios.post(
                "http://localhost:3001/auth/refresh",
                {
                    refreshToken,
                }
            );
            console.log(response.data);

            const { accessToken, expiresIn } = response.data;
            dispatch(setAccessToken(accessToken));
            dispatch(setExpiresInToken(expiresIn));
            // dispatch(setExpiresInToken(61));
        } catch (error) {
            window.location = "/";
        }
    }

    useEffect(() => {
        initializeTokens();
    }, [code]);

    useEffect(() => {
        if (!location.loaded || !accessToken) return;
        if (isLoggedIn) return;
        registerAccount();
    }, [location.loaded, accessToken]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(() => {
            refreshAuth();
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);
}
