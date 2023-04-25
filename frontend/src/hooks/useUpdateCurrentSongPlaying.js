import { mySpotifyApi } from "App";
import axios from "axios";
import URL from "data/URL";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { refreshRateMS } from "utils";

export default function useUpdateCurrentSongPlaying() {
    const spotifyId = useSelector((state) => state.appConfig.spotifyId);

    async function getMyCurrentlyPlayingSong() {
        try {
            // console.log("Getting currently playing song...");
            const result = (await mySpotifyApi.getMyCurrentPlaybackState()).body;
            // console.log(result);
            if (!result) return;

            const data = result.item;
            const songData = {
                songId: data.id,
            };
            // console.log(songData);

            const response = await axios.patch(
                `${URL}/accounts/songs/current-playing`,
                { spotifyId, songData }
            );
        } catch (error) {
            console.error(
                "There was an error getting the currently playing song"
            );
            console.error(error);
        }
    }

    useEffect(() => {
        if (!spotifyId) return;

        const interval = setInterval(() => {
            // console.log("I am running...");
            getMyCurrentlyPlayingSong();
        }, refreshRateMS);

        return () => clearInterval(interval);
    }, [spotifyId]);
}
