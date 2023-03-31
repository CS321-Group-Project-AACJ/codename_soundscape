import axios from "axios";
import Footer from "components/sections/Footer";
import CustomButton from "components/ui/CustomButton";
import React from "react";
import "./LoginScreen.css";

const CLIENT_ID = "cdd8517c97db4dca8fa03c9bfa9ef559";
const REDIRECT_URI = "http://localhost:3000";
const scopes =
    "ugc-image-upload%20user-read-playback-state%20user-read-currently-playing%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20user-follow-modify%20user-follow-read%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read%20user-read-email%20user-read-private";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;

export default function LoginScreen() {
    return (
        <>
            <div className="login-container">
                <div className="title">
                    <h1>Codename Soundscape</h1>
                    <p>Greeting message goes here!</p>
                </div>
                <div className="interactables">
                    <a href={AUTH_URL} style={{ textDecoration: "none" }}>
                        <CustomButton
                            text={"Login with Spotifty"}
                            style={{ backgroundColor: "#1DB954" }}
                        />
                    </a>
                    <p>
                        By continuing, you agree to our{" "}
                        <a href="">Terms of Service</a> and{" "}
                        <a href="">Privacy Policy</a>
                    </p>
                </div>
                <Footer />
            </div>
        </>
    );
}
