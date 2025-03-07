const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 메모리에 저장된 메시지
let messages = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User is Connected!.");

  // 클라이언트에 저장된 메시지 전송
  socket.emit("load messages", messages);

  socket.on("chat message", (msg) => {
    messages.push(msg); // 메시지를 저장
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User is Disconnected!");
  });
});

server.listen(3000, () => {
  console.log("Server is running port 3000");
});
