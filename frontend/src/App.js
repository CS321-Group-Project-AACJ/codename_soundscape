import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import { Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
import HomeScreen from "screens/Home/HomeScreen";
import DetailsScreen from "screens/Details/DetailsScreen";
import UserProfileScreen from "screens/UserProfile/UserProfileScreen";
import "./App.css";
import SettingsScreen from "screens/Settings/SettingsScreen";
import useGeoLocation from "hooks/useGeoLocation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import SearchScreen from "screens/Search/SearchScreen";
import useUpdateCurrentSongPlaying from "hooks/useUpdateCurrentSongPlaying";
import { setSpotifyId } from "features/appConfig/appConfigSlice";
import useUpdateRecentSongs from "hooks/useUpdateRecentSongs";
import MessageModal from "components/ui/MessageModal";
import AddToPlaylist from "components/sections/AddToPlaylist";

const code = new URLSearchParams(window.location.search).get("code");
export const mySpotifyApi = new SpotifyWebApi({
    clientId: "cdd8517c97db4dca8fa03c9bfa9ef559",
});

function App() {
    const isLoggedIn = useSelector((state) => state.appConfig.isLoggedIn);
    const accessToken = useSelector(
        (state) => state.appConfig.tokens.accessToken
    );
    const spotifyId = useSelector((state) => state.appConfig.spotifyId);
    const [accessTokenIsSet, setAccessTokenIsSet] = useState(false);
    const [spotifyIdIsSet, setSpotifyIdIsSet] = useState(false);
    const dispatch = useDispatch();

    async function getMySpotifyId() {
        const myData = await mySpotifyApi.getMe();
        const mySpotifyId = myData.body.id;

        dispatch(setSpotifyId(mySpotifyId));
        localStorage.setItem("spotifyId", mySpotifyId);
    }

    useEffect(() => {
        if (!accessToken) return;
        // console.log("I ran");
        mySpotifyApi.setAccessToken(accessToken);
        setAccessTokenIsSet(true);

        getMySpotifyId();
        setSpotifyIdIsSet(true);
    }, [accessToken]);

    return code || (isLoggedIn && accessTokenIsSet && spotifyIdIsSet) ? (
        <AppComponent code={code} />
    ) : (
        <LoginScreen />
    );

    // <div className="app">
    //     <Nav />
    //     <PageHeader />

    //     <UserProfileScreen />
    // </div>
    // return <AppComponent />;
}

function AppComponent({ code }) {
    useGeoLocation();
    useAuth(code);
    useUpdateCurrentSongPlaying();
    useUpdateRecentSongs();
    const navigate = useNavigate();

    useEffect(() => {
        // navigate("/home");
    }, []);

    return (
        <div className="app">
            {/* <p>{code}</p> */}
            <Nav />
            <PageHeader />
            <MessageModal />
            <AddToPlaylist />

            <Routes>
                <Route
                    path="/profile"
                    element={<UserProfileScreen myProfile/>}
                />
                <Route path="/users/:spotifyId" element={<UserProfileScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                {/* insert new routs here */}
                <Route path="/details/:songId" element={<DetailsScreen />} />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="demo" element={<DemoScreen />} />
            </Routes>
        </div>
    );
}

export default App;
