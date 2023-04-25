import React, { useEffect, useState } from "react";
import "./SearchScreen.css";
import axios from "axios";
import URL from "data/URL";
import CustomButton from "components/ui/CustomButton";
import { useDispatch } from "react-redux";
import { setModalText, showModal } from "features/appConfig/appConfigSlice";
import { mySpotifyApi } from "App";
import SongCard from "components/sections/SongCard";

export default function SearchScreen() {
    const [searchText, setSearchText] = useState("");
    const [loading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [tracks, setTracks] = useState({});
    const [playlists, setPlaylists] = useState({});
    const dispatch = useDispatch();

    function handleSubmit(event) {
        setUsers([]);
        setTracks({});
        setPlaylists({});
        SearchUsers();
        SearchTracks();
        SearchPlaylists();
        setIsLoading(false);
    }

    async function SearchUsers() {
        try {
            const results = (
                await axios.get(
                    `${URL}/accounts/search?searchText=${searchText}`
                )
            ).data;
            // console.log(results);
            setUsers(results);
            // throw new Error();
        } catch (error) {
            console.error("There was an error getting users");
            dispatch(setModalText("There was an error getting users"));
            dispatch(showModal());
        }
    }

    async function SearchTracks() {
        try {
            const results = (await mySpotifyApi.searchTracks(searchText)).body;
            // console.log(results);
            setTracks(results);
        } catch (error) {
            console.error("There was an error getting tracks");
            dispatch(setModalText("There was an error getting tracks"));
            dispatch(showModal());
        }
    }

    async function SearchPlaylists() {
        try {
            const results = (await mySpotifyApi.searchPlaylists(searchText))
                .body;
            // console.log(results);
            setPlaylists(results);
        } catch (error) {
            console.error("There was an error getting playlists");
            dispatch(setModalText("There was an error getting playlists"));
            dispatch(showModal());
        }
    }

    return (
        <main className="search">
            <div className="search">
                <h1>Search</h1>
                {/* <form> */}
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {/* </form> */}
                <CustomButton
                    text="Search"
                    disabled={!searchText}
                    handleFunction={handleSubmit}
                />
            </div>
            <section>
                {users.length ? (
                    <div>
                        <h2>Users</h2>
                        {users.map((user, index) => (
                            <UserCard data={user} key={index} />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
                {Object.keys(tracks).length ? (
                    <div>
                        <h2>Tracks</h2>
                        {tracks?.tracks?.items?.map((track, index) => (
                            <SongCard songData={track} key={index}/>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </section>
        </main>
    );
}

function UserCard({ data }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function getUserData() {
        const results = (await mySpotifyApi.getUser(data.spotifyId)).body;
        setUser(results);
    }

    useEffect(() => {
        getUserData();
    }, [data]);

    return (
        <div>
            <div className="img-container">
                <img src={user?.images?.[0]?.url} />
            </div>
            <div>{user?.display_name}</div>
        </div>
    );
}
