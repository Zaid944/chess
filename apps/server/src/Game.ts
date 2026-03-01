import WebSocket from "ws";
import { Chess } from "chess.js";
import { Player } from "@chess/types";

export class Game {
    player1: Player;
    player2: Player;
    gameId: string;
    chessBoard: Chess;

    constructor() {
        this.player1 = {
            socket: null,
            color: "w",
        };
        this.player2 = {
            socket: null,
            color: "b",
        };
        this.gameId = crypto.randomUUID();
        this.chessBoard = new Chess();
    }

    addPlayer(player: WebSocket) {
        if (!this.player1.socket) {
            this.player1.socket = player;
            this.addListeners(this.player1);
            return this.gameId;
        } else if (!this.player2.socket) {
            this.player2.socket = player;
            this.addListeners(this.player2);
            return this.gameId;
        } else {
            return null;
        }
    }

    removePlayer(player: WebSocket) {}

    sendEvents(player: Player) {
        // no socket connection
        if (!player.socket) {
            return;
        }

        // check if both players joined
        if (this.player1.socket == null || this.player2.socket == null) {
            player.socket.send("Waiting for another player....");
            return;
        }

        // game started
        this.player1.socket.send("Game started");
        this.player2.socket.send("Game started");
    }

    addListeners(player: Player) {
        // no socket connection
        if (!player.socket) {
            return;
        }

        this.sendEvents(player);

        // add listeners
        player.socket.on("message", (payload) => {
            if (!player.socket) {
                return;
            }

            player.socket.send(`ok here is your move, ${payload}`);
            if (player == this.player1 && this.player2.socket) {
                this.player2.socket.send(`player1 played move, ${payload}`);
            } else if (
                player.socket == this.player2.socket &&
                this.player1.socket
            ) {
                this.player1.socket.send(`player2 played move, ${payload}`);
            }
        });

        player.socket.on("close", () => {
            if (player == this.player1 && this.player2.socket) {
                this.player2.socket.send("Opponent left the game");
                this.resetPlayer1();
                this.sendEvents(this.player2);
            } else if (player == this.player2 && this.player1.socket) {
                this.player1.socket.send("Opponent left the game");
                this.resetPlayer2();
                this.sendEvents(this.player1);
            }
        });
    }

    resetPlayer1() {
        this.player1 = {
            color: "w",
            socket: null,
        };
    }

    resetPlayer2() {
        this.player1 = {
            color: "b",
            socket: null,
        };
    }
}
