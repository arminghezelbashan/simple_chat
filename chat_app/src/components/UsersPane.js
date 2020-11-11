import React from "react";
import UserRow from "./UserRow";
import UserSeparator from "./UserSeparator";

const styles = {
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: 25,
    paddingTop: 5,
    alignItems: "center",
    overflowY: "auto",
  },
};

function UsersPane({ users, username }) {
  const getUserComponents = () => {
    let userComponents = [];
    let counter = 0;
    users.forEach((user) => {
      userComponents.push(
        <UserRow
          username={user.username}
          isUser={user.username === username}
          color={user.color}
        />
      );
      userComponents.push(<UserSeparator />);
      counter += 1;
    });
    userComponents.pop();
    return userComponents;
  };

  return <div style={styles.container}>{getUserComponents()}</div>;
}

export default UsersPane;
