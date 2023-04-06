import React from "react";

import UserCard from "./UserCard";

function UserList({ users }) {
    return (
        <div className="user-list">
            {/* {users.map((user) => (
                <UserCard user={user} key={user.id} />
            ))} */}
            <UserCard user={users[0]} key={users[0].id} />
        </div>
    );
}

export default UserList;
