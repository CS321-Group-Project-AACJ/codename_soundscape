import React from "react";
import { Link, useMatch } from "react-router-dom";
import Footer from "./Footer";
import "./Nav.css";

export default function Nav() {
    return (
        <nav>
            <div>
                <NavLink name={"Home"} path={"/home"} />
                <NavLink name={"Search"} path={"/search"} />
                <NavLink name={"Profile"} path={"/profile"} />
                <NavLink name={"Settings"} path={"/settings"} />
                <NavLink name={"Details"} path={"/details"} />
            </div>
            <Footer style={{ fontSize: ".8rem" }} />
        </nav>
    );
}

function NavLink({ name, path }) {
    const active = useMatch(path);
    return (
        <Link to={path} style={{textDecoration: "none"}}>
            <div className={`nav-link ${active ? "active" : ""}`}>{name}</div>
        </Link>
    );
}
