import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import { Route, Routes } from "react-router-dom";
import useAuth from "hooks/useAuth";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
import HomeScreen from "screens/Home/HomeScreen";
import UserProfileScreen from "screens/UserProfile/UserProfileScreen";
import "./App.css";
import SettingsScreen from "screens/Settings/SettingsScreen";
import useGeoLocation from "hooks/useGeoLocation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const code = new URLSearchParams(window.location.search).get("code");
export const mySpotifyApi = new SpotifyWebApi({
    clientId: "cdd8517c97db4dca8fa03c9bfa9ef559",
});
// export const SpotifyAccessTokenContext = createContext();

function App() {
    const isLoggedIn = useSelector((state) => state.appConfig.isLoggedIn);
    const accessToken = useSelector(
        (state) => state.appConfig.tokens.accessToken
    );
    const [accessTokenIsSet, setAccessTokenIsSet] = useState(false);

    useEffect(() => {
        if (!accessToken) return;
        console.log("I ran");
        mySpotifyApi.setAccessToken(accessToken);
        setAccessTokenIsSet(true);
    }, [accessToken]);

    return code || (isLoggedIn && accessTokenIsSet) ? <AppComponent code={code} /> : <LoginScreen />;

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

    return (
        <div className="app">
            {/* <p>{code}</p> */}
            <Nav />
            <PageHeader />

            <Routes>
                <Route path="/profile" element={<UserProfileScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                {/* insert new routs here */}
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="demo" element={<DemoScreen />} />
            </Routes>
        </div>
    );
}

export default App;
