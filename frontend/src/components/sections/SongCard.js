import React, { useEffect, useState } from "react";
import { ArtistsToString } from "utils";
import { FaEllipsisV } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { MdOutlineQueue } from "react-icons/md";
import { mySpotifyApi } from "App";
import { Link } from "react-router-dom";
import "./SongCard.css";

export default function SongCard({ songData, isLoading }) {
    // console.log(songData);
    // if (songData) console.log(songData.name);
    // console.log(songData);
    const [isLiked, setIsLiked] = useState(false);

    async function toggleLike() {
        const prevValue = isLiked;
        try {
            if (isLiked) {
                await mySpotifyApi.removeFromMySavedTracks([songData.id]);
            } else {
                await mySpotifyApi.addToMySavedTracks([songData.id]);
            }
            setIsLiked((prev) => !prev);
        } catch (error) {
            setIsLiked(prevValue);
        }
    }

    async function getIsLiked() {
        try {
            if (songData?.id) {
                const isLikedData = (
                    await mySpotifyApi.containsMySavedTracks([songData?.id])
                )?.body[0];
                setIsLiked(isLikedData);
            }
        } catch (error) {
            // setIsLiked(false);
        }
    }

    useEffect(() => {
        getIsLiked();
    }, [songData]);

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
                        <Link to={`../details/${songData?.id}`}>
                            <img
                                src={
                                    songData?.album?.images?.[0]?.url || (
                                        <ImgPlaceholder />
                                    )
                                }
                            />
                        </Link>
                    </div>
                    <div className="song-info">
                        <Link to={`../details/${songData?.id}`}>
                            <p>{songData?.name}</p>
                            <p>{ArtistsToString(songData?.artists)}</p>
                        </Link>
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
        );
    }
}

function ImgPlaceholder() {
    return (
        <div>
            <div></div>
        </div>
    );
}
