import { Game } from "./Game.js";
import WebSocket from "ws";

export class GameManager {
    private games: Game[];

    constructor() {
        this.games = [];
    }

    createGame(player: WebSocket) {
        if (this.games.length == 0) {
            this.initializeNewGame(player);
            return;
        }

        const lastGame = this.games[this.games.length - 1];
        const gameId = lastGame.addPlayer(player);

        if (!gameId) {
            this.initializeNewGame(player);
            return;
        }
    }

    initializeNewGame(player: WebSocket) {
        const game = new Game();
        game.addPlayer(player);
        this.games.push(game);
        return;
    }
}
