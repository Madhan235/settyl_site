import { Server } from "socket.io";
import http from "http";
import express from "express";

// creating express server

const app = express();

// creating http server and binding with the express

const server = http.createServer(app);

// creating socket server and binding it with the http server

// configuring cross orign resource sharing limitations

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// function to get the socket id from the userSocketMap by giving params as the userId

export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};

//Object for userId as key and socketId as value
const userSocketMap = {};

// calling io.on function and executing its callback with the socket.id

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== undefined) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap)); //array of userId's

  socket.on("disconnect", () => {
    console.log("user disconnected");

    // updating userSocketMap when user offline

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
