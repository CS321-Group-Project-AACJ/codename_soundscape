import React, { useEffect, useState } from "react";
import "./AddToPlaylist.css";
import { useDispatch, useSelector } from "react-redux";
import {
    hideAddToPlaylist,
    setModalText,
    showModal,
} from "features/appConfig/appConfigSlice";
import { mySpotifyApi } from "App";

export default function AddToPlaylist() {
    const [isLoading, setIsLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const isShowing = useSelector(
        (state) => state.appConfig.addToPlaylist.addToPlaylistIsShowing
    );
    const songToAddId = useSelector(
        (state) => state.appConfig.addToPlaylist.songToAddId
    );
    const userId = useSelector((state) => state.appConfig.spotifyId);
    const dispatch = useDispatch();

    async function getMyPlaylists() {
        const results = (await mySpotifyApi.getUserPlaylists(userId)).body;
        // console.log(results);
        setPlaylists(results);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!isShowing) return;
        getMyPlaylists();
    }, [isShowing]);

    if (!isShowing) return <></>;

    return (
        <div
            className="background"
            onClick={() => dispatch(hideAddToPlaylist())}
        >
            <div className="add-playlist-container">
                <div className="playlists">
                    {isLoading ? (
                        <>
                            <Playlist isLoading />
                            <Playlist isLoading />
                            <Playlist isLoading />
                        </>
                    ) : (
                        playlists?.items?.map((item, index) => (
                            <Playlist playlistData={item} key={index} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function Playlist({ isLoading, playlistData }) {
    const songToAddId = useSelector(
        (state) => state.appConfig.addToPlaylist.songToAddId
    );
    const dispatch = useDispatch();

    async function addToPlaylist() {
        try {
            const songURI = (await mySpotifyApi.getTrack(songToAddId)).body.uri;
            const results = (
                await mySpotifyApi.addTracksToPlaylist(playlistData?.id, [
                    songURI,
                ])
            ).body;
            // console.log(results);
            dispatch(setModalText("Song successfully added to your playlist"));
            dispatch(showModal());
        } catch (error) {
            // console.log(error);
            dispatch(
                setModalText("We had trouble adding the song to your playlist")
            );
            dispatch(showModal());
        }
    }

    // console.log(playlistData);
    if (isLoading) {
        return (
            <div className="playlist-container">
                <div className="img-container loading">
                    {/* <img src={img} /> */}
                </div>
                <p className="text loading"></p>
            </div>
        );
    } else {
        return (
            <div className="playlist-container" onClick={addToPlaylist}>
                <div className="img-container">
                    <img src={playlistData?.images?.[0]?.url} />
                </div>
                <p>{playlistData.name}</p>
            </div>
        );
    }
    return <></>;
}
