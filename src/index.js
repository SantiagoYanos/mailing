import app from "./app.js";
import dotenv from "dotenv";
import { Server as WebSocketServer } from "socket.io";
import { Sockets } from "./sockets.js";
import http from "http";

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const httpServer = server.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});

const io = new WebSocketServer(httpServer);

Sockets(io);
