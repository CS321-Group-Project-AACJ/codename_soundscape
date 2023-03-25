import axios from "axios";
import Footer from "components/sections/Footer";
import CustomButton from "components/ui/CustomButton";
import React from "react";
import "./LoginScreen.css";

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=e6e5578b3b134ffbb5c3bfc78c17c710&response_type=code&redirect_uri=http://localhost:3000";

export default function LoginScreen() {
    return (
        <>
            <div className="login-container">
                <div className="title">
                    <h1>Codename Soundscape</h1>
                    <p>Greeting message goes here!</p>
                </div>
                <div className="interactables">
                    <a href={AUTH_URL} style={{textDecoration: "none"}}>
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
