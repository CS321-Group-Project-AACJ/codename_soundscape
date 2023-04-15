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
    setTimestamp,
} from "../features/appConfig/appConfigSlice.js";
import SpotifyWebApi from "spotify-web-api-node";
import URL from "data/URL.js";

const spotifyApi = new SpotifyWebApi({
    clientId: "cdd8517c97db4dca8fa03c9bfa9ef559",
});

export default function useAuth(code) {
    const location = useSelector((state) => state.appConfig.location);

    const accessToken = useSelector(
        (state) => state.appConfig.tokens.accessToken
    );
    const refreshToken = useSelector(
        (state) => state.appConfig.tokens.refreshToken
    );
    const expiresIn = useSelector((state) => state.appConfig.tokens.expiresIn);
    const timestamp = useSelector((state) => state.appConfig.tokens.timestamp);

    const isLoggedIn = useSelector((state) => state.appConfig.isLoggedIn);

    const dispatch = useDispatch();

    async function initializeTokens() {
        try {
            const response = await axios.post(`${URL}/auth/login`, {
                code,
            });
            console.log(response.data);
            window.history.pushState({}, null, "/home");

            const { accessToken, refreshToken, expiresIn } = response.data;
            const time = Date.now();
            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
            dispatch(setExpiresInToken(expiresIn));
            // dispatch(setExpiresInToken(61));
            dispatch(setTimestamp(time));

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            // localStorage.setItem("expiresIn", expiresIn);
            localStorage.setItem("expiresIn", 61);
            localStorage.setItem("timestamp", time);
        } catch (error) {
            // window.location = "/";
        }
    }

    async function registerAccount() {
        try {
            console.log(location);
            const registerResponse = await axios.post(
                `${URL}/accounts/register`,
                {
                    accessToken,
                    longitude: location.coordinates.lng,
                    latitude: location.coordinates.lat,
                }
            );
            console.log(registerResponse);
            dispatch(setIsLoggedIn(true));
            localStorage.setItem("isLoggedIn", true);
        } catch (error) {
            // window.location = "/";
        }
    }

    async function refreshAuth() {
        try {
            const response = await axios.post(`${URL}/auth/refresh`, {
                refreshToken,
            });
            console.log(response.data);

            const { accessToken, expiresIn } = response.data;
            const time = Date.now();
            dispatch(setAccessToken(accessToken));
            dispatch(setExpiresInToken(expiresIn));
            // dispatch(setExpiresInToken(61));
            dispatch(setTimestamp(time));

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresIn", expiresIn);
            // localStorage.setItem("expiresIn", 61);
            localStorage.setItem("timestamp", time);
        } catch (error) {
            // window.location = "/";
        }
    }

    useEffect(() => {
        if (!accessToken || !refreshToken || !expiresIn || !timestamp) {
            console.log("I am bout to initialize app");
            console.log("This is first time logging in");
            initializeTokens();
        } else {
            console.log(
                "We have logged in before, checking access token in storage..."
            );
            refreshAuth();
        }
    }, [code]);

    // To register a new account in our server
    useEffect(() => {
        if (!location.loaded || !accessToken) return;
        if (isLoggedIn) return;
        registerAccount();
    }, [location.loaded, accessToken]);

    // For setting the interval to automatically refresh the access token when close to expiration
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(() => {
            refreshAuth();
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    //For setting the access token for the spotifyApi Helper globally
    // useEffect(() => {
    //     if (!accessToken) return;
    //     console.log("I ran");
    //     spotifyApi.setAccessToken(accessToken);
    // }, [accessToken]);
}
