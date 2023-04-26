import React, { useContext, useEffect, useState } from "react";
import "./UserProfileScreen.css";
import CustomButton from "components/ui/CustomButton";

import pfp from "../../assets/images/profile_pic.png";
import spotifyLogo from "../../assets/images/spotify_logo.png";

import playlistCover1 from "../../assets/images/playlist-cover1.png";
import playlistCover2 from "../../assets/images/playlist-cover2.png";
import playlistCover3 from "../../assets/images/playlist-cover3.png";

import Real from "../../assets/images/Album-cover-Real.jpeg";
import Toast from "../../assets/images/Album-cover-Toast.jpeg";
import Drake from "../../assets/images/Album-cover-Drake.jpeg";
import September from "../../assets/images/Album-cover-September.jpeg";
import NoIdea from "../../assets/images/Album-cover-NoIdea.jpeg";
import Vibe from "../../assets/images/Album-cover-Vibe.jpeg";
import { useSelector } from "react-redux";
import { mySpotifyApi } from "App";
import axios from "axios";
import URL from "data/URL";
import SongCard from "components/sections/SongCard";
import { refreshRateMS } from "utils";
import { useParams } from "react-router-dom";
import PageHeader from "components/sections/PageHeader";
export default function UserProfileScreen({ myProfile }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [currentSong, setCurrentSong] = useState({});
    const [playlists, setPlaylists] = useState({});
    const [recentTracks, setRecentTracks] = useState({});

    const { spotifyId } = useParams();
    // console.log(spotifyId);

    async function getRecentTracks(userId) {
        const results = (
            await axios.get(`${URL}/accounts/songs/recents?spotifyId={userId}`)
        ).data;
        // console.log(results);
    }

    async function getMyData() {
        try {
            // const response = await mySpotifyApi.getMe();
            const userData = await mySpotifyApi.getMe();
            const userId = userData.body.id;
            // console.log(userId);
            const playlists = await mySpotifyApi.getUserPlaylists(userId);
            const recents = await mySpotifyApi.getMyRecentlyPlayedTracks();
            // console.log(recents.body);
            // console.log(userData.body);
            // console.log(playlists.body);
            setUserData(userData.body);
            setPlaylists(playlists.body);
            // setRecentTracks(recents.body);
            setIsLoading(false);
        } catch (error) {
            // console.log(error);
        }
    }

    async function getUserData() {
        try {
            // const response = await mySpotifyApi.getMe();
            const userData = (await mySpotifyApi.getUser(spotifyId)).body;
            const playlists = (await mySpotifyApi.getUserPlaylists(spotifyId))
                .body;
            // const recents = await mySpotifyApi.getMyRecentlyPlayedTracks();
            // console.log(recents.body);
            // console.log(userData);
            // console.log(playlists);
            setUserData(userData);
            setPlaylists(playlists);
            // setRecentTracks(recents.body);
            setIsLoading(false);
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        if (myProfile) {
            getMyData();
        } else {
            getUserData();
        }
    }, []);

    return (
        <main className="user-profile">
            {<PageHeader pageName={"Profile"}/>}
            <UserProfileHeaderView userData={userData} isLoading={isLoading} />
            <UserProfileBodyView
                playlists={playlists}
                recentSongs={recentTracks}
                isLoading={isLoading}
                myProfile={myProfile}
                spotifyId={spotifyId}
            />
        </main>
    );
}

function UserProfileHeaderView({ userData, myProfile, isLoading }) {
    const [followerCnt, setFollowerCnt] = useState(0);

    useEffect(() => {
        if (!userData) return;
        if (userData.followers === undefined) return;
        setFollowerCnt(userData.followers.total);
    }, [userData]);

    if (isLoading) {
        return (
            <div className="user-header">
                <div className="img-container loading"></div>
                <div className="info">
                    <div className="username text loading"></div>
                    <div className="follow-info">
                        <div className="followers text loading"></div>
                        <div className="following text loading"></div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="user-header">
                <div className="img-container">
                    <img src={userData?.images?.[0]?.url || pfp} />
                </div>
                <div className="info">
                    <div className="username">{userData.display_name}</div>
                    <div className="follow-info">
                        <div className="followers">
                            {followerCnt || 0}{" "}
                            {followerCnt === 1 ? "follower" : "followers"}
                        </div>
                        <div className="following">0 following</div>
                    </div>
                    <div className="interactables">
                        {!myProfile ? (
                            <CustomButton
                                text="Follow"
                                style={{ flexGrow: 0.5 }}
                            />
                        ) : (
                            <></>
                        )}
                        <a
                            href={userData?.external_urls?.spotify}
                            target="_blank"
                            className="spotify-profile-btn"
                        >
                            <img src={spotifyLogo} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function UserProfileBodyView({
    playlists,
    recentSongs,
    isLoading,
    myProfile,
    spotifyId,
}) {
    return (
        <div className="main-content">
            <CurrentlyPlayingView
                isLoading={isLoading}
                myProfile={myProfile}
                spotifyId={spotifyId}
            />
            <PlaylistsView playlists={playlists} isLoading={isLoading} />
            <RecentSongsView
                recentSongs={recentSongs}
                isLoading={isLoading}
                myProfile={myProfile}
                spotifyId={spotifyId}
            />
        </div>
    );
}

function CurrentlyPlayingView({ isLoading, spotifyId, myProfile }) {
    const localSpotifyId = useSelector((state) => state.appConfig.spotifyId);
    const [songData, setSongData] = useState({});
    const [localIsLoading, setLocalIsLoading] = useState(true);

    async function getCurrentlyPlayingSong() {
        const idToUse = myProfile ? localSpotifyId : spotifyId;
        const songId = (
            await axios.get(
                `${URL}/accounts/songs/current-playing?spotifyId=${idToUse}`
            )
        ).data;
        // console.log(songId);

        const songData = (await mySpotifyApi.getTrack(songId)).body;
        // console.log(songData);
        setSongData(songData);
        setLocalIsLoading(false);
    }

    useEffect(() => {
        getCurrentlyPlayingSong();
        const interval = setInterval(() => {
            getCurrentlyPlayingSong();
        }, refreshRateMS);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="currently-container">
            <h2>Currently Listening To</h2>
            {/* <div className="currently-wrapper">
                <div className="currently-content"></div>
            </div> */}
            <SongCard
                songData={songData}
                isLoading={isLoading || localIsLoading}
            />
        </section>
    );
}

function PlaylistsView({ playlists, isLoading }) {
    return (
        <section className="playlists">
            <h2>Playlists</h2>
            {isLoading ? (
                <div>
                    <Playlist isLoading />
                    <Playlist isLoading />
                    <Playlist isLoading />
                </div>
            ) : (
                <div>
                    {playlists?.items?.map((item, index) => (
                        <Playlist playlistData={item} key={index} />
                    ))}

                    {/* <div>See more on Spotify...</div> */}
                </div>
            )}
        </section>
    );
}

function RecentSongsView({ isLoading, spotifyId, myProfile }) {
    const localSpotifyId = useSelector((state) => state.appConfig.spotifyId);
    const [songsData, setSongsData] = useState([]);
    const [localIsLoading, setLocalIsLoading] = useState(true);

    async function getRecentTracks() {
        const idToUse = myProfile ? localSpotifyId : spotifyId;
        const results = (
            await axios.get(`${URL}/accounts/songs/recents?spotifyId=${idToUse}`)
        ).data;
        // console.log(results);

        const songsData = [];
        for (let index = 0; index < results.length; index++) {
            const songId = results[index].songId;
            const songData = (await mySpotifyApi.getTrack(songId)).body;
            songsData.push(songData);
        }

        // console.log(songsData);
        setSongsData(songsData);
        setLocalIsLoading(false);
    }

    useEffect(() => {
        getRecentTracks();
        const interval = setInterval(() => {
            getRecentTracks();
        }, refreshRateMS);

        return () => clearInterval(interval);
    }, []);

    // console.log(recentSongs);
    return (
        <section className="recents">
            <h2>Recent Listing History</h2>
            {isLoading ? (
                <div className="history-container">
                    <SongCard isLoading />
                    <SongCard isLoading />
                    <SongCard isLoading />
                    <SongCard isLoading />
                    <SongCard isLoading />
                </div>
            ) : (
                <>
                    <div className="history-container">
                        {songsData?.map((item, index) => (
                            <SongCard
                                songData={item}
                                key={index}
                                isLoading={isLoading || localIsLoading}
                            />
                        ))}
                    </div>
                    {/* <div style={{ textAlign: "right" }}>Load more...</div> */}
                </>
            )}
        </section>
    );
}

function Genre({ name }) {
    return <div className="genre-container">{name}</div>;
}

function Playlist({ isLoading, playlistData }) {
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
            <div className="playlist-container">
                <div className="img-container">
                    <img src={playlistData?.images?.[0]?.url} />
                </div>
                <p>{playlistData.name}</p>
            </div>
        );
    }
    return <></>;
}
