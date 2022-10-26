import Board from "./Board";
import Play from "./Play";

type Game = {
    readonly name: string;
    readonly score: any;
    readonly board: Board;
    readonly plays: Array<Play>;
};

export default Game;