import React, { useEffect, useState } from "react";
import "./DetailsScreen.css";
import CustomButton from "components/ui/CustomButton";
import PageHeader from "components/sections/PageHeader";
import { useParams } from "react-router-dom";

import spotifyLogo from "../../assets/images/spotify_logo.png";

import playlistCover1 from "../../assets/images/playlist-cover1.png";

import { mySpotifyApi } from "App";

async function getSongData(songId) {
    try {
      console.log(`Getting song data for ${songId}...`);
      const result = (await mySpotifyApi.getTrack(songId)).body;
      console.log(result);
      if (!result) return;

      const songData = {
        songId: result.id,
        name: result.name,
        artistIds: result.artists.map(artist => artist.id),
        album: result.album.name,
        imageUrl: result.album.images[0].url,
        duration_ms: result.duration_ms,
        track_number: result.track_number,
      };
      
      console.log(songData);
  
      return songData;
    } catch (error) {
      console.error(`There was an error getting song data for ${songId}`);
      console.error(error);
    }
  }

  async function getArtistData(artistIds) {
    try {
      console.log(`Getting artist data for ${artistIds}`);
      const artistData = [];
  
      for (let i = 0; i < artistIds.length; i++) {
        const result = (await mySpotifyApi.getArtist(artistIds[i])).body;
  
        if (!result) continue;
  
        const artist = {
          artistId: result.id,
          name: result.name,
          imageUrl: result.images[0].url,
        };
  
        artistData.push(artist);
      }
  
      return artistData;
    } catch (error) {
      console.error(`There was an error getting artist data for ${artistIds}`);
      console.error(error);
    }
}


export default function DetailsScreen() {
    const [song, setSong] = useState(null);
    const [artistData, setArtistData] = useState(null);
    const { songId } = useParams();

    useEffect(() => {
        async function fetchSongDetails() {
            const songDetails = await getSongData(songId);
            console.log(songDetails);
            setSong(songDetails);
            
            const artistDetails = await getArtistData(songDetails.artistIds);
            console.log("Artist Detail:",artistDetails);
            setArtistData(artistDetails);
        }
        fetchSongDetails();
    }, [songId]);

    if (!song || !artistData) {
        return <div>Loading...</div>;
    }

    return (
        <main className="song-details">
            {<PageHeader pageName={"Details"}/>}
            <div className="song-header">
                <div className="song-img">
                    <img src={song?.imageUrl || null} width="250" height="250" />
                </div>
                <div className="info">
                    <div className="song-name-container">
                        <div className="song-name">{song?.name}</div>
                    </div>
                    <div className="song-data">
                        <div className="data">{`${song?.track_number}. ${song?.name} - ${formatDuration(song?.duration_ms)}`}</div>
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
                        handleFunction={() => console.log()}
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
                            name={song?.album}
                            img={song?.imageUrl|| null}
                        />
                    </div>
                    {/* <div>See more on Spotify...</div> */}
                </div>
                
                <div className="column">
                    <div className="history-container">
                        {artistData.map((artist) => (
                            <ArtistCard
                                key={artist.artistId}
                                artist={artist}
                                img={artist.imageUrl}
                                style={{ flex: 5 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function Album({ name, img }) {
    return (
        <div className="playlist-container">
            <div className="playlist-image-container">
                <img src={img ?? null} />
            </div>
            {name}
        </div>
    );
}

function ArtistCard1({ artists = [], img }) {
    function ArtistsToString() {
        console.log("artists:",artists);
        if (artists.length == 0)return;
        let artistsString = artists[0];
        if (artists.length > 1) {
            for (let i = 1; i < artists.length; i++) {
                const artist = artists[i];
                artistsString += `, ${artist}`;
            }
        }
        console.log("artists:",artistsString);
        return artistsString;
    }

    return (
        <div className="song-container">
            <div className="img-container">
                <img src={img ?? null} />
            </div>
            <div className="song-info">
                <p>{ArtistsToString()}</p>
            </div>
        </div>
    );
}

function ArtistCard({ artist, img }) {
    return (
      <div className="song-container">
        <div className="img-container">
          <img src={img ?? null} />
        </div>
        <div className="song-info">
          <p>{artist.name}</p>
        </div>
      </div>
    );
  }

  function ArtistCards({ artists = [] }) {
  return (
    <div>
      {artists.map((artist) => (
        <ArtistCard key={artist.artistId} artist={artist} img={artist.imageUrl} />
      ))}
    </div>
  );
}