import Square from "./Square";

type Board = {
    readonly [key: number]: Square;
};

export default Board;