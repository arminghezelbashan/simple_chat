import React, { createRef, useEffect } from "react";
import Message from "./Message";

const styles = {
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: "100%",
    height: "100%",
    borderRadius: 25,
    overflowY: "auto",
  },
  innerContainer: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
};

function MessagesPane({ messages, username }) {
  const containerRef = createRef();

  useEffect(() => {
    containerRef.current.scrollTop = Number.MAX_SAFE_INTEGER;
  });

  const getMessageComponents = () => {
    let messageComponents = [];
    let counter = 0;
    messages.forEach((m) => {
      messageComponents.push(
        <Message
          key={counter}
          message={m.message}
          isUser={m.username === username}
          username={m.username}
          timestamp={m.timestamp}
          userColor={m.color}
        />
      );
      counter += 1;
    });
    return messageComponents;
  };

  return (
    <div style={styles.container} ref={containerRef}>
      <div style={styles.innerContainer}>{getMessageComponents()}</div>
    </div>
  );
}

export default MessagesPane;
