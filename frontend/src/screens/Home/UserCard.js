import React from "react";
import "./UserCard.css";

function UserCard({ user }) {
    return (
        <div className="user-card-container">
            <div className="user-info">
                <div className="left">
                    <div className="img-container">
                        <img src={user.image} alt={user.name} />
                    </div>
                    <div>
                        <div style={{ margin: "0 10px", fontSize: "1.3rem" }}>
                            username
                        </div>
                        <div style={{ margin: "0 10px", fontSize: ".8rem" }}>
                            4 min. ago
                        </div>
                    </div>
                </div>
                <div >...</div>
            </div>
            <div className="song-info">
                <div className="left">
                    <div className="img-container">
                        <img src={user.song} alt={user.name} />
                    </div>
                    <div className="song-detail">
                        {/* <div className="button-song"> */}
                        <p
                            className="user-card-title"
                            style={{ margin: "0 10px", fontSize: "1.8rem" }}
                        >
                            {user.title}
                        </p>
                        <p
                            className="user-card-artist"
                            style={{ margin: "0 10px", fontSize: "1rem" }}
                        >
                            {user.artist}
                        </p>
                        {/* </div> */}
                    </div>
                </div>
                <div className="interactions">
                    <div>heart</div>
                    <div>playlist</div>
                    <div>queue</div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
