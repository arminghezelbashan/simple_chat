import React from "react";

const styles = {
  container: {
    width: "100%",
  },
  text: {
    padding: "10px 15px",
    maxWidth: "100%",
    wordWrap: "break-word",
    overflowWrap: "anywhere",
  },
};

function UserRow({ username, isUser, color }) {
  return (
    <div style={styles.container}>
      <div style={{ color, ...styles.text }}>
        {username}
        {isUser && " (You)"}
      </div>
    </div>
  );
}

export default UserRow;
