import React from "react";
import "./SettingsScreen.css";
import CustomButton from "components/ui/CustomButton";

export default function SettingsScreen() {
    function handleLogOut() {
        localStorage.clear();
        window.location = "/";
    }

    return (
        <>
            <div>Settings Screen</div>
            <CustomButton text={"Log Out"} handleFunction={handleLogOut} />
        </>
    );
}
