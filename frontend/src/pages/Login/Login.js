import axios from "axios";
import Footer from "components/sections/Footer";
import CustomButton from "components/ui/CustomButton";
import React from "react";

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=e6e5578b3b134ffbb5c3bfc78c17c710&response_type=code&redirect_uri=http://localhost:3000";

export default function Login() {
    return (
        <div>
            <a href={AUTH_URL}>
                <CustomButton text={"Login with Spotifty"} style={{backgroundColor: "#1DB954"}}/>
            </a>
            <Footer />
        </div>
    );
}
