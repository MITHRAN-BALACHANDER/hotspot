const express = require('express');
const http = require('http');
const socketio = require("socket.io");
const cors = require('cors');
const { addUsers, removeUser, getUser } = require('./entity');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log(`🔵 New connection: ${socket.id}`);

    socket.on('join', ({ name, room }, callback) => {
        const { user, error } = addUsers(socket.id, name, room);
        
        if (error) {
            if (callback) callback(error);
            return;
        }

        console.log(`✅ User joined: ${user.name} in Room: ${user.room}`);

        socket.join(user.room);

        // Notify user and room members
        socket.emit('toastmessage', { user: 'admin', text: `Welcome, ${user.name}!` });
        socket.emit('message', { user: 'admin', text: `You joined the room ${user.room}` });

        socket.broadcast.to(user.room).emit('toastmessage', { user: 'admin', text: `${user.name} has joined` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` });

        if (callback) callback(); // Acknowledge successful join
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: user.name, text: message });
        } else {
            if (callback) callback("❌ User not found");
        }
    });

    socket.on('disconnect', () => {
        console.log(`🔴 User disconnected: ${socket.id}`);

        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
        }
    });
});

server.listen(199, () => {
    console.log("🚀 Server running at http://localhost:199");
});
