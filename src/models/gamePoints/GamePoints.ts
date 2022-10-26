import Game from "../Game";
import {gamePointsItem, GamePointsItem} from "./GamePointsItem";
import {getRandomNumberInRange} from "../../utils/RandomUtils";
import GamePointsBoard from "./GamePointsBoard";
import AttributesCheck from "../AttributesCheck";
import GamePointsScore from "./GamePointsScore";
import GamePointsBonus from "./GamePointsBonus";

const ATTRIBUTES_ERROR_MESSAGES: AttributesCheck = {
    size: {
        value: "The size must be bigger than 0..."
    },
    gamePointsItems: {
        duplicated: "There are duplicated item names..."
    },
    board: {
        invalid: "Invalid board..."
    }
};

const DEFAULT_GAME_POINTS_ITEMS_KEY: Record<string, string> = {
        A: "A",
        B: "B",
        C: "C",
        D: "D"
    },
    DEFAULT_GAME_POINTS_ITEMS: Array<GamePointsItem> = [
        {name: DEFAULT_GAME_POINTS_ITEMS_KEY.A, weight: 50},
        {name: DEFAULT_GAME_POINTS_ITEMS_KEY.B, weight: 30},
        {name: DEFAULT_GAME_POINTS_ITEMS_KEY.C, weight: 20},
        {name: DEFAULT_GAME_POINTS_ITEMS_KEY.D, weight: 10},
    ];

export default interface GamePoints extends Game {
    readonly gamePoints: boolean; // Instance check
    readonly score: GamePointsScore;
    readonly board: GamePointsBoard;
    readonly bonuses: Array<GamePointsBonus>;
};

function getSanitizedSize(size: number): number {
    if (size < 0) throw new TypeError(ATTRIBUTES_ERROR_MESSAGES.size.value);

    return Math.round(size);
}

function getSanitizedGetPointsItems(gamePointsItemsRaw: Array<GamePointsItem>): Array<GamePointsItem> {
    const gamePointsKeys: Array<string> = [];

    for (let i = 0; i < gamePointsItemsRaw.length; i++) {
        if (gamePointsKeys.indexOf(gamePointsItemsRaw[i].name) >= 0) throw new TypeError(ATTRIBUTES_ERROR_MESSAGES.gamePointsItems.duplicated);

        try {
            gamePointsItem(gamePointsItemsRaw[i].name, gamePointsItemsRaw[i].weight);
        } catch (e) {
            throw new TypeError((e as Error).message);
        }

        gamePointsKeys.push(gamePointsItemsRaw[i].name);
    }

    return gamePointsItemsRaw;
}

function getInitialBoard(gamePointsItems: Array<GamePointsItem>, size: number): GamePointsBoard {
    const result: GamePointsBoard = {};

    for (let i = 0; i < size; i++) {
        let randomGamePointItem = gamePointsItems[getRandomNumberInRange(0, gamePointsItems.length - 1)];

        result[i] = {position: i, played: false, gamePointsItem: gamePointsItem(randomGamePointItem.name, randomGamePointItem.weight)};
    }

    return result;
}

interface GamePointsLargeConfig {
    size: number;
    gamePointsItems?: Array<GamePointsItem>;
    bonuses?: Array<GamePointsBonus>;
}

interface GamePointsShortConfig {
    board: GamePointsBoard;
    bonuses?: Array<GamePointsBonus>;
}

function instanceOfLargeConfig(object: any): object is GamePointsLargeConfig {
    return 'size' in object;
}

const defaultParameters: GamePoints = {
    name: "Game Points",
    plays: [],
    score: {total: 0, individuals: {}, totalBonus: 0},
    gamePoints: true,
    board: {},
    bonuses: []
};

//TODO deeper checks like on positioning args
function getSanitizedBoard(board: GamePointsBoard): GamePointsBoard {
    for (let square in board) {
        try {
            gamePointsItem(board[square].gamePointsItem.name, board[square].gamePointsItem.weight);
        } catch (e) {
            throw new TypeError(ATTRIBUTES_ERROR_MESSAGES.board.invalid);
        }
    }

    return board;
}

const gamePoints = (config: GamePointsLargeConfig | GamePointsShortConfig): GamePoints => {
    const {size = 0, gamePointsItems = DEFAULT_GAME_POINTS_ITEMS, bonuses, board} = {...defaultParameters, ...config};

    return {
        ...defaultParameters,
        board: instanceOfLargeConfig(config) ? getInitialBoard(getSanitizedGetPointsItems(gamePointsItems?.length ? gamePointsItems : DEFAULT_GAME_POINTS_ITEMS), getSanitizedSize(size)) : getSanitizedBoard(board),
        bonuses: bonuses || []
    };
};

const instanceOfGamePoints = (object: any): object is GamePoints => {
    return 'gamePoints' in object;
};

export {gamePoints, DEFAULT_GAME_POINTS_ITEMS_KEY, DEFAULT_GAME_POINTS_ITEMS, instanceOfGamePoints};