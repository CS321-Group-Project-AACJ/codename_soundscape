import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

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

            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
            setExpiresIn(response.data.expiresIn);
            // setExpiresIn(61);
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

            setAccessToken(response.data.accessToken);
            setExpiresIn(response.data.expiresIn);
            // setExpiresIn(61);
        } catch (error) {
            window.location = "/";
        }
    }

    useEffect(() => {
        initializeTokens();
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(() => {
            refreshAuth();
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
