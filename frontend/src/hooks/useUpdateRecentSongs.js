import { mySpotifyApi } from "App";
import axios from "axios";
import URL from "data/URL";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { refreshRateMS } from "utils";

export default function useUpdateRecentSongs() {
    const spotifyId = useSelector((state) => state.appConfig.spotifyId);

    async function getMyRecentSongs() {
        try {
            // console.log("Getting currently playing song...");
            const recents = (await mySpotifyApi.getMyRecentlyPlayedTracks())
                .body;
            if (!recents) return;
            // console.log(recents?.items[0]?.track?.id);
            const ids = recents.items.map((item) => item.track.id);
            // console.log(ids);

            postMyRecentSongs(ids);
            // const response = await axios.patch(
            //     `${URL}/accounts/songs/current-playing`,
            //     { spotifyId, songData }
            // );
        } catch (error) {
            console.error(
                "There was an error getting the currently playing song"
            );
            console.error(error);
        }
    }

    async function postMyRecentSongs(songIds) {
        const results = await axios.patch(`${URL}/accounts/songs/recents`, {
            spotifyId,
            songIds,
        });
        // console.log(results);
    }

    useEffect(() => {
        if (!spotifyId) return;

        const interval = setInterval(() => {
            // console.log("I am running...");
            getMyRecentSongs();
        }, refreshRateMS);

        return () => clearInterval(interval);
    }, [spotifyId]);
}
