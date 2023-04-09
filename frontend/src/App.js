import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import { Route, Routes } from "react-router-dom";
import useAuth from "hooks/useAuth";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
import DetailsScreen from "screens/Details/DetailsScreen"
import UserProfileScreen from "screens/UserProfile/UserProfileScreen";
import "./App.css";
import SettingsScreen from "screens/Settings/SettingsScreen";
import useGeoLocation from "hooks/useGeoLocation";
import { useSelector } from "react-redux";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
    const isLoggedIn = useSelector((state) => state.appConfig.isLoggedIn);

    return code || isLoggedIn ? <AppComponent code={code} /> : <LoginScreen />;

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
            </Routes>
        </div>
    );
}

export default App;
