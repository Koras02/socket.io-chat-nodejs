const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../index.html"); // 클라이언트 HTML 파일 제공
});

io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다.");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // 모든 클라이언트에 메시지 전송
  });

  socket.on("disconnect", () => {
    console.log("사용자가 연결을 끊었습니다.");
  });
});

server.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중입니다.");
});
