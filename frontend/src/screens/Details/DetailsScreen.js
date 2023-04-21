import React from "react";
import "./DetailsScreen.css";
import CustomButton from "components/ui/CustomButton";
import PageHeader from "components/sections/PageHeader";

import spotifyLogo from "../../assets/images/spotify_logo.png";

import playlistCover1 from "../../assets/images/playlist-cover1.png";

import September from "../../assets/images/Song-cover-September.jpg";

import bestOfEWF from "../../assets/images/Album-cover-September.jpeg";

import { mySpotifyApi } from "App";

export default function DetailsScreen() {
    return (
        <main className="song-details">
            {/* <PageHeader pageName={"Details"}/>*/}
            <div className="song-header">
                <div className="song-img">
                    <img src={September} width="250" height="250" />
                </div>
                <div className="info">
                    <div className="song-name-container">
                        <div className="song-name">September</div>
                    </div>
                    <div className="song-data">
                        <div className="data">1:13 - track length</div>
                    </div>
                    <div className="interactables">
                        <CustomButton 
                        text="Add To Playlist" 
                        style={{flexGrow: 0.35 }} 
                        />

                        <CustomButton 
                        text="Save to library" 
                        type="TERTIARY" 
                        />
                    </div>
                    <div className="spotifyconnect">
                        <CustomButton
                        text="Open In Spotify"
                        style={{ alignItems: "center", width: 400, height: 65 }}
                        type="PRIMARY"
                        handleFunction={() => searchAndOpenTrackUrl("September")}
                        />
                    </div>
                </div>
            </div>
            <div className="main-content" >
                <div className="sub-head">
                    <div className="left-sub-head">
                        <h3>Appears On:</h3>
                    </div>
                    <div className="right-sub-head">
                        <h3>Artists</h3>
                    </div>
                </div>
                <div className="column">
                    <div className="album">
                        <Album
                            name="The Best of Earth, Wind & Fire, Vol. 1"
                            img={bestOfEWF}
                        />
                    </div>
                    {/* <div>See more on Spotify...</div> */}
                </div>
                
                <div className="column">
                    <div className="history-container">
                        <ArtistCard
                            artists={["Earth, Wind & Fire"]}
                            img={September}
                            style={{ flex: 5 }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

function Album({ name, img }) {
    return (
        <div className="playlist-container">
            <div className="playlist-image-container">
                <img src={img} />
            </div>
            {name}
        </div>
    );
}

async function searchAndOpenTrackUrl(trackName) {
    const searchResults = await mySpotifyApi.searchTracks(trackName);
    const firstTrack = searchResults?.tracks?.items?.[0];
    if (firstTrack) {
      const externalUrl = firstTrack.external_urls.spotify;
      console.log(externalUrl);
      //window.open(externalUrl, "_blank");
      //return externalUrl;
    }
    return null;
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
