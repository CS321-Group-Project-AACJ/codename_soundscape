import Footer from "components/sections/Footer";
import Nav from "components/sections/Nav";
import PageHeader from "components/sections/PageHeader";
import useAuth from "hooks/useAuth";
import DemoScreen from "screens/Demo/DemoScreen";
import LoginScreen from "screens/Login/LoginScreen";
// import LoginScreen from "screens/LoginScreen/LoginScreen";
import UserProfileScreen from "screens/UserProfile/UserProfileScreen";
import "./App.css";

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

    return (
        <div className="app">
            {/* <p>{code}</p> */}
            <Nav />
            <PageHeader />

            <UserProfileScreen />
        </div>
    );
}

export default App;
