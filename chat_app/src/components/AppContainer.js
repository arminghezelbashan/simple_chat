import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import MessagesPane from "./MessagesPane";
import MessageInput from "./MessageInput";
import UsersPane from "./UsersPane";
import ErrorMessage from "./ErrorMessage";

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 5,
    height: "100%",
  },
  chatHistory: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
  },
  inputContainer: {},
  mainContainer: {
    width: "95%",
    maxWidth: 960,
    flex: 1,
    backgroundColor: "#cde9e8",
    borderRadius: 25,
    margin: "20px 0px",
    overflow: "hidden",
    display: "flex",
  },
  screen: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#282c34",
  },
  usersContainer: {
    flex: 2,
    padding: 20,
    display: "flex",
  },
};

const ENDPOINT = "http://127.0.0.1:5133";
// const ENDPOINT = "http://136.159.5.25:5133"; //CPSC server

function AppContainer(props) {
  const [socket, setSocket] = useState();
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT));
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (socket) {
      const cookieUsername = getCookie("username");
      if (cookieUsername) {
        socket.emit("user-command", {
          command: "name",
          data: cookieUsername,
        });
      }

      const cookieColor = getCookie("color");
      if (cookieColor) {
        socket.emit("user-command", { command: "color", data: cookieColor });
      }

      socket.on("set-username", (data) => {
        setUsername(data.username);
        setCookie("username", data.username);
      });
      socket.on("update-messages", (messages) => setMessages(messages));
      socket.on("update-users", (users) => setConnectedUsers(users));
      socket.on("handle-error", (errorMessage) => {
        setErrorMessage(errorMessage);
        setTimeout(() => setErrorMessage(null), 3000);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const cookieUsername = getCookie("username");
      if (cookieUsername && cookieUsername !== username) {
        socket.emit("user-command", {
          command: "name",
          data: cookieUsername,
        });
      }

      const cookieColor = getCookie("color");
      if (cookieColor) {
        socket.emit("user-command", { command: "color", data: cookieColor });
      }
    }
  }, [username]);

  const getCookie = (name) => {
    const searchParam = name + "=";
    const cookiesList = document.cookie.split(";");
    for (let i = 0; i < cookiesList.length; i++) {
      const cookie = cookiesList[i].trim();
      if (cookie.startsWith(searchParam)) {
        const cookieValue = cookie.split("=")[1];
        return cookieValue;
      }
    }
    return null;
  };

  const setCookie = (name, value) => {
    document.cookie = name + "=" + value + ";";
  };

  const handleSendMessage = (message) => {
    if (message[0] === "/") {
      const command = message.split(" ")[0].substring(1);
      const data = message.substring(command.length + 1).trim();
      socket.emit("user-command", { command, data });
      if (command === "color") {
        setCookie("color", data);
      }
    } else {
      socket.emit("send-message", { message: message });
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.mainContainer}>
        <div style={styles.chatContainer}>
          <div style={styles.chatHistory}>
            <MessagesPane messages={messages} username={username} />
          </div>
          <div style={styles.inputContainer}>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
        <div style={styles.usersContainer}>
          <UsersPane users={connectedUsers} username={username} />
        </div>
      </div>
    </div>
  );
}

export default AppContainer;
