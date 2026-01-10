import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js";

const server = http.createServer();

const wss = new WebSocketServer({ server });

const gameManager = new GameManager();

wss.on("connection", (ws: WebSocket) => {
    gameManager.createGame(ws);
});

wss.on("close", () => {
    console.log("Client disconnected");
});

server.listen(3000, () => {
    console.log("WebSocket server running on ws://localhost:3000");
});
