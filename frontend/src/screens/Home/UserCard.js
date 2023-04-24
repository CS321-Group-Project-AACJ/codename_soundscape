import React, { useEffect, useState } from "react";
import "./UserCard.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { MdOutlineQueue } from "react-icons/md";
import { mySpotifyApi } from "App";
import { ArtistsToString } from "../../utils";
import DefaultProfilePicture from "../../../src/assets/images/default-profile-photo.jpg";
import { Link } from "react-router-dom";

function UserCard({ user, parentIsLoading }) {
    const [songData, setSongData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [gotData, setGotData] = useState(false);

    async function getSongData() {
        console.log("Getting song data...");
        const songId = user?.currentSong?.song?.songId;
        console.log(songId);
        if (!songId) {
            setGotData(true);
            return;
        }

        const result = (await mySpotifyApi.getTrack(songId)).body;
        console.log(result);
        setSongData(result);

        const isLiked = (await mySpotifyApi.containsMySavedTracks([songId]))
            .body[0];
        console.log(isLiked);
        setIsLiked(isLiked);
        setIsLoading(false);
        setGotData(true);
    }

    useEffect(() => {
        if (!user || parentIsLoading) return;
        getSongData();
    }, [user]);

    async function toggleLike() {
        const prevValue = isLiked;
        try {
            if (isLiked) {
                await mySpotifyApi.removeFromMySavedTracks([
                    user?.currentSong?.song?.songId,
                ]);
            } else {
                await mySpotifyApi.addToMySavedTracks([
                    user?.currentSong?.song?.songId,
                ]);
            }
            setIsLiked((prev) => !prev);
        } catch (error) {
            setIsLiked(prevValue);
        }
    }

    if (isLoading && gotData) {
        return;
    }

    if (isLoading) {
        return (
            <div className="user-card-container">
                <div className="user-info">
                    <div className="left">
                        <div className="img-container loading"></div>
                        <div>
                            <div
                                className="text loading"
                                style={{
                                    margin: "8px 10px",
                                    fontSize: "1.3rem",
                                }}
                            ></div>
                            <div
                                className="text loading"
                                style={{
                                    margin: "8px 10px",
                                    fontSize: ".8rem",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="song-info">
                    <div className="left">
                        <div className="img-container loading"></div>
                        <div className="song-detail">
                            {/* <div className="button-song"> */}
                            <p
                                className="user-card-title text loading"
                                style={{
                                    margin: "8px 10px",
                                    fontSize: "1.8rem",
                                }}
                            ></p>
                            <p
                                className="user-card-artist  text loading"
                                style={{ margin: "8px 10px", fontSize: "1rem" }}
                            ></p>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="user-card-container">
                <div className="user-info">
                    <Link to={`../users/${user.spotifyId}`}>
                        <div className="left">
                            <div className="img-container">
                                <img
                                    src={user.image || DefaultProfilePicture}
                                    alt={user.name}
                                />
                            </div>
                            <div>
                                <div
                                    style={{
                                        margin: "0 10px",
                                        fontSize: "1.3rem",
                                    }}
                                >
                                    {user.spotifyId}
                                </div>
                                <div
                                    style={{
                                        margin: "0 10px",
                                        fontSize: ".8rem",
                                    }}
                                >
                                    4 min. ago
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div>
                        <FaEllipsisV size="1.2rem" className="interactable" />
                    </div>
                </div>
                <div className="song-info">
                    <div className="left">
                        <div className="img-container">
                            <img
                                src={songData?.album?.images?.[0]?.url || null}
                                alt={"album picture"}
                            />
                        </div>
                        <div className="song-detail">
                            {/* <div className="button-song"> */}
                            <p
                                className="user-card-title"
                                style={{ margin: "0 10px", fontSize: "1.8rem" }}
                            >
                                {songData?.name}
                            </p>
                            <p
                                className="user-card-artist"
                                style={{ margin: "0 10px", fontSize: "1rem" }}
                            >
                                {ArtistsToString(songData.artists)}
                            </p>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="interactions">
                        <div>
                            {isLiked ? (
                                <FaHeart
                                    color="red"
                                    className="interactable"
                                    onClick={toggleLike}
                                />
                            ) : (
                                <FaRegHeart
                                    className="interactable"
                                    onClick={toggleLike}
                                />
                            )}
                        </div>
                        <div>
                            <MdPlaylistAdd className="interactable" />
                        </div>
                        <div>
                            <MdOutlineQueue className="interactable" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCard;
