import GamePoints, {DEFAULT_GAME_POINTS_ITEMS_KEY, gamePoints} from "../models/gamePoints/GamePoints";
import {getRandomNumberInRange} from "./RandomUtils";
import {extraLetterBonus} from "../models/gamePoints/GamePointsBonus";
import GamePointsBoard from "../models/gamePoints/GamePointsBoard";
import {GamePointsItem} from "../models/gamePoints/GamePointsItem";

interface BoardConfig {
    times: number;
    gamePointsItem: GamePointsItem;
}

const getRandomGamePointsGame = (): GamePoints => {
    return gamePoints(
        {
            size: getRandomNumberInRange(15, 20),
            bonuses: [extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.A, 3, 50), extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.B, 2, 30)]
        }
    );
};

const getBoard = (config: Array<BoardConfig>): GamePointsBoard => {
    const board: GamePointsBoard = {};
    let currentPosition = 0;

    for (let i = 0; i < config.length; i++) {
        for (let j = 0; j < config[i].times; j++) {
            board[currentPosition] = {played: false, position: currentPosition, gamePointsItem: config[i].gamePointsItem};
            currentPosition++;
        }
    }

    return board;
}

export {getRandomGamePointsGame, getBoard};