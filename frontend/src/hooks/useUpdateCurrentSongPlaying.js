import { mySpotifyApi } from "App";
import axios from "axios";
import URL from "data/URL";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useUpdateCurrentSongPlaying() {
    const spotifyId = useSelector((state) => state.appConfig.spotifyId);
    console.log(spotifyId);

    async function getMyCurrentlyPlayingSong() {
        try {
            console.log("Getting currently playing song...");
            const data = (await mySpotifyApi.getMyCurrentPlaybackState()).body
                .item;
            console.log(data);
            const songData = {
                songId: data.id,
            };
            console.log(songData);

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
            console.log("I am running...");
            getMyCurrentlyPlayingSong();
        }, 10000);

        return () => clearInterval(interval);
    }, [spotifyId]);
}
