import Board from "../Board";
import GamePointsSquare from "./GamePointsSquare";

export default interface GamePointsBoard extends Board {
    [key: number]: GamePointsSquare;
}