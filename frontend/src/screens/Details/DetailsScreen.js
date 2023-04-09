import React from "react";
import "./DetailsScreen.css";
import CustomButton from "components/ui/CustomButton";
import PageHeader from "components/sections/PageHeader";

import spotifyLogo from "../../assets/images/spotify_logo.png";

import playlistCover1 from "../../assets/images/playlist-cover1.png";

import September from "../../assets/images/Song-cover-September.jpg";

import bestOfEWF from "../../assets/images/Album-cover-September.jpeg";

export default function DetailsScreen() {
    return (
        <main className="song-details">
            {/* <PageHeader /> */}
            <div className="song-header">
                <div className="song-img">
                    <img src={September} width="250" height="250" />
                </div>
                <div className="info">
                    <div className="song-name">September</div>
                    <div className="song-data">
                        <div className="data">1:13 - track length</div>
                    </div>
                    <div className="interactables">
                        <CustomButton text="Save to library" type="TERTIARY" />
                        <CustomButton
                            text="Add To Playlist"
                            style={{ flexGrow: 0.35 }}
                        />
                    </div>
                    <div className="spotifyconnect">
                        <CustomButton
                            text="Open In Spotify"
                            style={{
                                alignitems: "center",
                                width: 400,
                                height: 65,
                            }}
                            type="PRIMARY"
                        />
                    </div>
                </div>
            </div>
            <div className="main-content" class="row">
                <h3>Appears On:</h3>

                <div class="column">
                    <Album
                        name="The Best of Earth, Wind & Fire, Vol. 1"
                        img={bestOfEWF}
                    />
                    {/* <div>See more on Spotify...</div> */}
                </div>
                <h3>Artists</h3>
                <div className="history-container" class="column">
                    <ArtistCard
                        artists={["Earth, Wind & Fire"]}
                        img={September}
                        style={{ flex: 5 }}
                    />
                </div>
            </div>
        </main>
    );
}

function Album({ name, img }) {
    return (
        <div className="playlist-container">
            <div className="img-container">
                <img src={img} />
            </div>
            <p>{name}</p>
        </div>
    );
}

function ArtistCard({ artists, img }) {
    function ArtistsToString() {
        let artistsString = artists[0];
        if (artists.length > 1) {
            for (let i = 1; i < artists.length; i++) {
                const artist = artists[i];
                artistsString += `, ${artist}`;
            }
        }
        return artistsString;
    }

    return (
        <div className="song-container">
            <div className="img-container">
                <img src={img} />
            </div>
            <div className="song-info">
                <p>{ArtistsToString()}</p>
            </div>
        </div>
    );
}
