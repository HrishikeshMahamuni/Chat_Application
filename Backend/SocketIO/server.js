import { Server } from "socket.io";
import  http  from "http";
import express from 'express';

const app = express();  

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4001",
        methods: ["GET", "POST"]
    }
});

// Real Time Messaging 

export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}

const users = {};

io.on("connection", (socket) => {
    console.log("A user connected",socket.id);
    const userId = socket.handshake.query.userId;
    console.log("User ID - ",userId);

    if(userId) {
        users[userId] = socket.id;
        console.log("users : ",users);
    }
    console.log("users = ",users);

    io.emit("getOnline", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("A user disconnected - ",socket.id);
        delete users[userId];
        io.emit("getOnline", Object.keys(users));
    });
});

export {io, server, app};