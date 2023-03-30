import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    async function fetchRequest() {
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
        } catch (error) {
            window.location = "/";
        }
    }

    useEffect(() => {
        fetchRequest();
    }, [code]);

    return accessToken;
}
