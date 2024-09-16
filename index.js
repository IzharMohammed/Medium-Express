const PORT = 4000;
const express = require("express");
const cors = require("cors");
const app = express();
const http = require('http').Server(app);
app.use(cors());

app.get('/test', (req, res) => {
    res.json({ msg: "successful" });
})

const socketIo = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

socketIo.on("connection", (socket) => {
    console.log(`${socket.id}: connected`);
    socket.on("disconnect", () => {
        console.log('disconnected');
    })
})







http.listen(PORT, () => {
    console.log(`server is up on port: ${PORT}`);
})