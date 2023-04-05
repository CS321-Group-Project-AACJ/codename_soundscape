import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import { Route, Routes } from "react-router-dom";
import useAuth from "hooks/useAuth";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
import HomeScreen from "screens/Home/HomeScreen"
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
    useGeoLocation();
    useAuth(code);

    return (
        <div className="app">
            {/* <p>{code}</p> */}
            <Nav />
            <PageHeader />

            <Routes>
                <Route path="/profile" element={<UserProfileScreen />} />
                <Route path="demo" element={<DemoScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
<<<<<<< HEAD
                <Route path="/home" element={<HomeScreen />} />
=======
                <Route path="/home" element={<SettingsScreen />} />
>>>>>>> fc063eb (Updated changes to new master)
            </Routes>
        </div>
    );
}

export default App;
