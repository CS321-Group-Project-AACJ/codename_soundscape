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

export default function UserProfileScreen({ myProfile }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [playlists, setPlaylists] = useState({});
    const [recentTracks, setRecentTracks] = useState({});

    async function getMyData() {
        try {
            // const response = await mySpotifyApi.getMe();
            const userData = await mySpotifyApi.getMe();
            const userId = userData.body.id;
            console.log(userId);
            const playlists = await mySpotifyApi.getUserPlaylists(userId);
            const recents = await mySpotifyApi.getMyRecentlyPlayedTracks();
            console.log(recents.body);
            console.log(userData.body);
            console.log(playlists.body);
            setUserData(userData.body);
            setPlaylists(playlists.body);
            setRecentTracks(recents.body);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyData();
    }, []);

    return (
        <main className="user-profile">
            <UserProfileHeaderView userData={userData} isLoading={isLoading} />
            <UserProfileBodyView
                playlists={playlists}
                recentSongs={recentTracks}
                isLoading={isLoading}
            />
        </main>
    );
}

function UserProfileHeaderView({ userData, myProfile, isLoading }) {
    const [followerCnt, setFollowerCnt] = useState(0);

    useEffect(() => {
        if (!userData) return;
        if (userData.followers === undefined ) return;
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
                    <img src={pfp} />
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
                        <a href={userData.external_urls.spotify} target="_blank" className="spotify-profile-btn">
                            <img src={spotifyLogo} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function UserProfileBodyView({ playlists, recentSongs, isLoading }) {
    return (
        <div className="main-content">
            <GenresView />
            <PlaylistsView playlists={playlists} isLoading={isLoading} />
            <RecentSongsView recentSongs={recentSongs} isLoading={isLoading} />
        </div>
    );
}

function GenresView() {
    const genres = [
        "Pop",
        "Rock",
        "Hip Hop",
        "Latin",
        "Dance",
        "R&B",
        "Country",
        "Metal",
        "Jazz",
        "Classical",
        "Extra one Idk",
    ];

    return (
        <section className="genres-container">
            <h2>Genre's Listened To</h2>
            <div className="genres-wrapper">
                <div className="genres-content">
                    {genres.map((item, i) => (
                        <Genre key={i} name={item} />
                    ))}
                </div>
            </div>
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
                    {playlists.items.map((item, index) => (
                        <Playlist playlistData={item} key={index} />
                    ))}

                    {/* <div>See more on Spotify...</div> */}
                </div>
            )}
        </section>
    );
}

function RecentSongsView({ recentSongs, isLoading }) {
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
                        {recentSongs.items.map((item, index) => (
                            <SongCard songData={item} key={index} />
                        ))}
                    </div>
                    <div style={{ textAlign: "right" }}>Load more...</div>
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
                    <img src={playlistData.images[0].url} />
                </div>
                <p>{playlistData.name}</p>
            </div>
        );
    }
    return <></>;
}

function SongCard({ name, img, isLoading, songData }) {
    // console.log(songData);
    // if (songData) console.log(songData.name);
    function ArtistsToString() {
        const artists = songData.track.artists;
        if (!artists) return "";

        let artistsString = artists[0].name;
        if (artists.length > 1) {
            for (let i = 1; i < artists.length; i++) {
                const artist = artists[i];
                // console.log(artist);
                artistsString += `, ${artist.name}`;
            }
        }
        return artistsString;
    }

    if (isLoading) {
        return (
            <div className="song-container">
                <div className="img-container loading">
                    {/* <img src={img} /> */}
                </div>
                <div className="song-info">
                    <p className="text loading" style={{ width: "80%" }}></p>
                    <p className="text loading"></p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="song-container">
                <div className="img-container">
                    <img src={songData.track.album.images[0].url} />
                </div>
                <div className="song-info">
                    <p>{songData.track.name}</p>
                    <p>{ArtistsToString()}</p>
                </div>
            </div>
        );
    }
}
