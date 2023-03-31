import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import { Route, Routes } from "react-router-dom";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
// import LoginScreen from "screens/LoginScreen/LoginScreen";
import UserProfileScreen from "screens/UserProfile/UserProfileScreen";
import "./App.css";

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
            </Routes>
        </div>
    );
}

export default App;
