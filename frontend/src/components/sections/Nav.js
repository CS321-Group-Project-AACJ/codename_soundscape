import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./Nav.css";

export default function Nav() {
    return (
        <nav>
            <div>
                <Link to="/home">
                    <div>Home</div>
                </Link>
                <Link to="/search">
                    <div>Search</div>
                </Link>
                <Link to="/profile">
                    <div>Profile</div>
                </Link>
                <Link to="/settings">
                    <div>Settings</div>
                </Link>
            </div>
            <Footer style={{ fontSize: ".8rem" }} />
        </nav>
    );
}
