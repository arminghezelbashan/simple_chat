import React from "react";

const styles = {
  bubble: {
    backgroundColor: "#d7d7d7",
    padding: "5px 10px",
    borderRadius: 15,
    display: "inline-block",
  },
  bubbleUser: {
    backgroundColor: "#147efb",
    padding: "5px 10px",
    borderRadius: 15,
    display: "inline-block",
    color: "#fff",
  },
  container: {
    padding: "5px 10px",
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
  },
  innerContainerUser: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  text: {},
  timestamp: {
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5,
    color: "#797979",
    whiteSpace: "nowrap",
  },
  user: {
    marginLeft: 15,
    marginBottom: 2,
    fontSize: 10,
  },
  userUser: {
    marginRight: 15,
    marginBottom: 2,
    fontSize: 10,
    textAlign: "right",
  },
};

function Message({ username, isUser, timestamp, message, userColor }) {
  return (
    <div style={styles.container}>
      <div
        style={
          isUser
            ? { color: userColor, ...styles.userUser }
            : { color: userColor, ...styles.user }
        }
      >
        {username}
      </div>
      <div style={isUser ? styles.innerContainerUser : styles.innerContainer}>
        <div style={isUser ? styles.bubbleUser : styles.bubble}>
          <span style={styles.text}>{message}</span>
        </div>
        <div style={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  );
}

export default Message;
