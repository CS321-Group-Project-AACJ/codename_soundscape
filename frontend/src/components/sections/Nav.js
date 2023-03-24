import React from "react";
import Footer from "./Footer";
import "./Nav.css";

export default function Nav() {
    return (
        <nav>
            <div>
                <div>Home</div>
                <div>Search</div>
                <div>Profile</div>
                <div>Settings</div>
            </div>
            <Footer style={{fontSize: ".8rem"}}/>
        </nav>
    );
}
