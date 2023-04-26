import React from "react";
import "./SettingsScreen.css";
import CustomButton from "components/ui/CustomButton";
import PageHeader from "components/sections/PageHeader";
export default function SettingsScreen() {
    function handleLogOut() {
        localStorage.clear();
        window.location = "/";
    }

    return (
        <>
           
            {<PageHeader pageName={"Settings"}/>}
            <CustomButton text={"Log Out"} handleFunction={handleLogOut} />
        </>
    );
}
