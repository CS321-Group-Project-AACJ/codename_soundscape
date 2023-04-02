import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setLocation} from "../features/appConfig/appConfigSlice";

export default function useGeoLocation() {
    const dispatch = useDispatch();

    function onSuccess(location) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const newLocation = {
            loaded: true,
            coordinates: {
                lat: latitude,
                lng: longitude,
            },
        };
        dispatch(setLocation(newLocation));
    }

    function onError(error) {
        const newLocation = {
            loaded: true,
            error,
        };
        dispatch(setLocation(newLocation));
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
}
