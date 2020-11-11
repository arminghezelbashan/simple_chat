var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

function generateUsername() {
  let username = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = chars.length;
  for (let i = 0; i < 8; i++) {
    username += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return username;
}

let messages = [];
let connectedUsers = [];

io.on("connection", (socket) => {
  let username = generateUsername();
  let color = null;
  while (connectedUsers.includes(username)) username = generateUsername();
  connectedUsers.push({ username, color });
  console.log(username + " connected");
  socket.emit("set-username", { username: username });
  socket.emit("update-messages", messages);
  io.emit("update-users", connectedUsers);

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter(
      (user) => user.username !== username
    );
    io.emit("update-users", connectedUsers);
    console.log(username + " disconnected");
  });

  socket.on("send-message", (data) => {
    const timestamp = new Date(Date.now());
    const timestampArr = timestamp.toLocaleTimeString().split(":");
    const timestampStr =
      timestampArr[0] +
      ":" +
      timestampArr[1] +
      " " +
      timestampArr[2].split(" ")[1];
    if (messages.length >= 200) messages.shift();
    messages.push({
      username,
      timestamp: timestampStr,
      message: data.message,
      color,
    });
    io.emit("update-messages", messages);
  });

  socket.on("user-command", (data) => {
    if (data.command === "name") {
      if (
        connectedUsers.filter((user) => user.username === data.data).length >= 1
      ) {
        socket.emit("handle-error", "Username already taken.");
        return;
      }
      connectedUsers = connectedUsers.map((user) =>
        user.username === username
          ? { username: data.data, color: user.color }
          : user
      );
      messages = messages.map((message) => {
        if (message.username === username) {
          message.username = data.data;
        }
        return message;
      });
      username = data.data;
      io.emit("update-messages", messages);
      io.emit("update-users", connectedUsers);
      socket.emit("set-username", { username: username });
      return;
    } else if (data.command === "color") {
      connectedUsers = connectedUsers.map((user) =>
        user.username === username
          ? { username: user.username, color: data.data }
          : user
      );
      messages = messages.map((message) => {
        if (message.username === username) {
          message.color = data.data;
        }
        return message;
      });
      color = data.data;
      io.emit("update-messages", messages);
      io.emit("update-users", connectedUsers);
      return;
    } else {
      socket.emit("handle-error", "Invalid command: " + data.command);
      return;
    }
  });
});

http.listen(5133, () => {
  console.log("listening on *:5133");
});
