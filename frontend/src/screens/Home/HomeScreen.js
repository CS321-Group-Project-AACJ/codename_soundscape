import React from "react";
import axios from "axios";
import Footer from "components/sections/Footer";
import CustomButton from "components/ui/CustomButton";
import UserList from "./UserList";
import users from "./users";
import "./HomeScreen.css";

export default function HomeScreen() {
	return (
		<>
	<div className="home">
		<div className="side-bar">
			<div className="left-side">
			<p className="nav">Home</p>
			<p className="nav">Search</p>
			<p className="nav">Profile</p>
		</div>
	</div>
		<div className="right-side">
			<UserList users={users} />
		</div>
	</div>
	</>
	);
}
