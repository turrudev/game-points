import {GamePointsItem} from "./GamePointsItem";
import Square from "../Square";

export default interface GamePointsSquare extends Square {
    played: boolean;
    readonly gamePointsItem: GamePointsItem;
}