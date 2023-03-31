import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import { Route, Routes } from "react-router-dom";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
import UserProfileScreen from "screens/UserProfile/UserProfileScreen";
import "./App.css";
import SettingsScreen from "screens/Settings/SettingsScreen";

function App() {
    return (
        // <DemoScreen />

        // <LoginScreen />

        <div className="app">
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
