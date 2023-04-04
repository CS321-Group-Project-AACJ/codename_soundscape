import React from "react";
import "./UserCard.css";

function UserCard({ user }) {
	return (
	<div className="user-card">
		<div className="user-card-image">
		<a href="#" className="button-profile">
			<img src={user.image} alt={user.name} className="circle-img" />
		</a>
		</div>
		<div className="song-image">
			<img src={user.song} alt={user.name} className="rounded-img" />
		</div>
		<div className="user-card-info">
			<p className="user-card-name">{user.name}</p>
			<a href="#" className="button-song">
			<p className="user-card-title">{user.title}</p>
			<p className="user-card-artist">{user.artist}</p>
			<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6B4qg-quPXlrAMyya6o3rpAgimnlsIkricw&usqp=CAU" alt="Black Arrow" className="arrow-img" />
			</a>
		</div>
	</div>
	);
}

export default UserCard;