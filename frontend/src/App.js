import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import { Route, Routes } from "react-router-dom";
import useAuth from "hooks/useAuth";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
import UserProfileScreen from "screens/UserProfile/UserProfileScreen";
import "./App.css";
import SettingsScreen from "screens/Settings/SettingsScreen";
import useGeoLocation from "hooks/useGeoLocation";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
    return code ? <AppComponent code={code} /> : <LoginScreen />;

    // <div className="app">
    //     <Nav />
    //     <PageHeader />

    //     <UserProfileScreen />
    // </div>
    // return <AppComponent />;
}

function AppComponent({ code }) {
    console.log(code);
    const accessToken = useAuth(code);
    // console.log(accessToken);

    const location = useGeoLocation();
    if (location) {
        console.log(location.coordinates.lat);
        console.log(location.coordinates.lng);
    }

    return (
        <div className="app">
            {/* <p>{code}</p> */}
            <Nav />
            <PageHeader />

            <Routes>
                <Route path="/profile" element={<UserProfileScreen accessToken={accessToken} />} />
                <Route path="demo" element={<DemoScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/home" element={<SettingsScreen />} />
            </Routes>
        </div>
    );
}

export default App;
