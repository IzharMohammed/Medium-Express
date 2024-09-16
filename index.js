// Define the port for the server
const PORT = 4000;

// Import necessary modules
const express = require("express");
const cors = require("cors");
const http = require('http');

// Create an Express application
const app = express();

// Create an HTTP server with Express
const server = http.createServer(app);

// Apply CORS middleware to allow cross-origin requests
app.use(cors());

// Define a route to handle GET requests to '/test'
app.get('/test', (req, res) => {
    res.json({ msg: "successful" });
});

// Initialize Socket.IO with the HTTP server and configure CORS
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173"  // Allow requests from this origin
    }
});

// Handle WebSocket connections
socketIo.on("connection", (socket) => {
    // Log when a client connects
    console.log(`${socket.id}: connected`);

    // Listen for 'message' events from clients
    socket.on("message", (data) => {
        // Log the received message data
        console.log(data);
        // Broadcast the message data to all connected clients
        socketIo.emit("messageResponse", data);
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
        // Log when a client disconnects
        console.log('disconnected');
    });
});

// Start the HTTP server and listen on the defined port
server.listen(PORT, () => {
    console.log(`server is up on port: ${PORT}`);
});
