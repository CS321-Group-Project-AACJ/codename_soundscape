import React from "react";
import axios from "axios";
import Footer from "components/sections/Footer";
import CustomButton from "components/ui/CustomButton";
import UserList from "./UserList";
import users from "./users";
import "./HomeScreen.css";
import PageHeader from "components/sections/PageHeader";
export default function HomeScreen() {
    return (
        <main className="home">
            {<PageHeader pageName={"Home"}/>}

            <UserList users={users} />
        </main>
    );
}
