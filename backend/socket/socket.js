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

// calling io.on function and executing its callback with the socket.id

io.on("connection", (socket) => {
  console.log("Connection established", socket.id);
});

export { io, server, app };
