const express = require('express');
const http = require('http');
const socketio = require("socket.io");
const cors = require('cors');

const path = require('path');
const { addUsers, removeUser, getUser } = require('./entity');


const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files (for Docker all-in-one)
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
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
      if(callback) callback(); // Acknowledge success
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

// Handle client-side routing - serve index.html for all non-API routes
// IMPORTANT: This must be AFTER Socket.io setup to avoid intercepting /socket.io/* routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use a higher port number that does not require root privileges
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
// const { v4: uuidv4 } = require("uuid");
// const express = require("express");
// const http = require("http");
// const socketio = require("socket.io");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Serve frontend build (for Docker/all-in-one deployment)
// app.use(express.static(path.join(__dirname, "public")));

// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] },
// });

// // State
// const users = {}; // socketId -> { name, lat, lon, roomId }
// const rooms = {}; // roomId -> [socketIds]

// // Distance function (Haversine)
// function getDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371e3; // meters
//   const φ1 = (lat1 * Math.PI) / 180;
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(Δφ / 2) ** 2 +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// }

// // Find nearby room within 100m
// function findNearbyRoom(lat, lon) {
//   for (const roomId in rooms) {
//     const anyUserId = rooms[roomId][0];
//     const u = users[anyUserId];
//     if (u && getDistance(lat, lon, u.lat, u.lon) <= 100) {
//       return roomId;
//     }
//   }
//   return null;
// }

// io.on("connection", (socket) => {
//   console.log(`🔵 New connection: ${socket.id}`);

//   socket.on("join", ({ name, lat, lon }, callback) => {
//     let roomId = findNearbyRoom(lat, lon);
//     if (!roomId) {
//       roomId = uuidv4();
//       rooms[roomId] = [];
//     }

//     users[socket.id] = { name, lat, lon, roomId };
//     rooms[roomId].push(socket.id);

//     socket.join(roomId);

//     socket.emit("message", {
//       user: "admin",
//       text: `You joined a nearby chat (100m radius).`,
//     });
//     socket.broadcast.to(roomId).emit("message", {
//       user: "admin",
//       text: `${name} joined nearby chat`,
//     });

//     if (callback) callback({ roomId });
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = users[socket.id];
//     if (user) {
//       io.to(user.roomId).emit("message", { user: user.name, text: message });
//       if (callback) callback();
//     } else {
//       if (callback) callback("❌ User not found");
//     }
//   });

//   socket.on("disconnect", () => {
//     const user = users[socket.id];
//     if (user) {
//       io.to(user.roomId).emit("message", {
//         user: "admin",
//         text: `${user.name} has left`,
//       });

//       // cleanup
//       rooms[user.roomId] = rooms[user.roomId].filter((id) => id !== socket.id);
//       if (rooms[user.roomId].length === 0) delete rooms[user.roomId];
//       delete users[socket.id];
//     }
//     console.log(`🔴 Disconnected: ${socket.id}`);
//   });
// });

// // Handle client-side routing (React SPA)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () =>
//   console.log(`🚀 Nearby chat server running at http://localhost:${PORT}`)
// );
