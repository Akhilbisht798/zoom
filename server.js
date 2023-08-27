const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: "http://localhost:5173"
});

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send("<h1>Server the frontend</h1>")
})

io.on('connection', (socket) => {
  console.log('a user connected');
	socket.emit("msg", "message")
});

server.listen(port, () => {
	console.log(port)
})
