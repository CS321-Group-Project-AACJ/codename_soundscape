import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import UserProfile from "pages/UserProfile/UserProfile";
import "./App.css";

function App() {
    return (
        // <Home />

        // <Login />

        <div className="app">
            <Nav />
            <PageHeader />
            <UserProfile />
        </div>
    );
}

export default App;
