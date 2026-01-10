import WebSocket from "ws";

export type Color = "w" | "b";

export type Player = {
    socket: WebSocket;
    color: Color;
};
