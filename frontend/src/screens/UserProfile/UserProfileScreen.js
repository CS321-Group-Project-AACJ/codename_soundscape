import React from "react";
import "./UserProfileScreen.css";
import CustomButton from "components/ui/CustomButton";
import PageHeader from "components/sections/PageHeader";

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

export default function UserProfileScreen({ myProfile }) {
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
        "Extra one Idk"
    ];

    return (
        <main className="user-profile">
            {/* <PageHeader /> */}
            <div className="user-header">
                <div className="user-img">
                    <img src={pfp} />
                </div>
                <div className="info">
                    <div className="username">@user_name</div>
                    <div className="follow-info">
                        <div className="followers">0 followers</div>
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
                        <div className="spotify-profile-btn">
                            <img src={spotifyLogo} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content">
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
                <section className="playlists">
                    <h2>Playlists</h2>
                    <div>
                        <Playlist
                            name="Generic playlist"
                            img={playlistCover1}
                        />
                        <Playlist
                            name="Hip-Hop Playlist"
                            img={playlistCover2}
                        />
                        <Playlist name="Chill Playlist" img={playlistCover3} />
                        {/* <div>See more on Spotify...</div> */}
                    </div>
                </section>
                <section className="recents">
                    <h2>Recent Listing History</h2>
                    <div className="history-container">
                        <SongCard
                            name="Real"
                            artists={["Kendrick Lamer"]}
                            img={Real}
                        />
                        <SongCard
                            name="Toast"
                            artists={["Koffee"]}
                            img={Toast}
                        />
                        <SongCard
                            name="Don't Matter To Me"
                            artists={["Drake", "Michael Jackson"]}
                            img={Drake}
                        />
                        <SongCard
                            name="September"
                            artists={["Earth, Wind & Fire"]}
                            img={September}
                        />
                        <SongCard
                            name="No Idea"
                            artists={["Don Toliver"]}
                            img={NoIdea}
                        />
                        <SongCard
                            name="Vibe"
                            artists={["Skip Marley", "Popcaan"]}
                            img={Vibe}
                        />
                    </div>
                    <div style={{ textAlign: "right" }}>Load more...</div>
                </section>
            </div>
        </main>
    );
}

function Genre({ name }) {
    return <div className="genre-container">{name}</div>;
}

function Playlist({ name, img }) {
    return (
        <div className="playlist-container">
            <div className="img-container">
                <img src={img} />
            </div>
            <p>{name}</p>
        </div>
    );
}

function SongCard({ name, artists, img }) {
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
                <p>{name}</p>
                <p>{ArtistsToString()}</p>
            </div>
        </div>
    );
}
