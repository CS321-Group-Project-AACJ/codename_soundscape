import React, { useEffect, useState } from "react";

export default function useGeoLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    });

    function onSuccess(location) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        setLocation({
            loaded: true,
            coordinates: {
                lat: latitude,
                lng: longitude,
            },
        });
    }

    function onError(error) {
        setLocation({
            loaded: true,
            error,
        });
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);
    return;
}
