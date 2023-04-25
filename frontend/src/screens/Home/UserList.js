import React, { useEffect, useState } from "react";

import UserCard from "./UserCard";
import axios from "axios";
import URL from "data/URL";
import { useSelector } from "react-redux";

function UserList() {
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const spotifyId = useSelector((state) => state.appConfig.spotifyId);

    async function getUsers() {
        console.log("Getting Users");
        const results = (
            await axios.get(
                `${URL}/accounts/home?spotifyId=${spotifyId}&maxDistance=5`
            )
        ).data;
        console.log(results);
        setUsers(results);
        setIsLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="user-list">
            {isLoading ? (
                <>
                    <UserCard parentIsLoading />
                    <UserCard parentIsLoading />
                    <UserCard parentIsLoading />
                    <UserCard parentIsLoading />
                </>
            ) : (
                users.map((user) => (
                    <UserCard user={user} key={user.spotifyId} />
                ))
            )}

            {/* <UserCard user={users[0]} key={users[0].id} /> */}
        </div>
    );
}

export default UserList;
