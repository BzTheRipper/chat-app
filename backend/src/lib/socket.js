const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const server = http.createServer(app);
const FRONTEDND_PORT = process.env.FRONTEDND_PORT;

const io = new Server(server, {
    cors: {
        origin: [`http://localhost:${FRONTEDND_PORT}`]
    }
});

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    console.log("User Socket Map value: ", userSocketMap);

    // Broadcast the events to all the connected clients (SENDING to the frontend/src/store/useAuthStore.connetSocket)
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

module.exports = { io, app, server }