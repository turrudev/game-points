import {cleanup, screen, waitFor} from '@testing-library/react';
import {APP_ID} from './App';
import {DEFAULT_GAME_POINTS_ITEMS, DEFAULT_GAME_POINTS_ITEMS_KEY, gamePoints} from "./models/gamePoints/GamePoints";
import {StyleSheetTestUtils} from "aphrodite";
import {getRandomNumberInRange} from "./utils/RandomUtils";
import GamePointsBonus, {extraLetterBonus} from "./models/gamePoints/GamePointsBonus";
import {ITEM_SQUARE_ID} from "./components/gamePoints/board/GamePointsItemSquare";
import {getBoard} from "./utils/GameUtils";
import {getBonus, getScore, renderApp} from "./tests/TestUtils";
import GamePointsBoard from "./models/gamePoints/GamePointsBoard";

interface GamePointsTestConfig {
    board: GamePointsBoard;
    expectedBonus: number;
    expectedTotal: number;
    bonuses?: Array<GamePointsBonus>
}

afterEach(cleanup);

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

test('renders a Game Point apps with minimum parameters', async () => {
    renderApp(gamePoints({size: 5}));

    expect((await screen.findAllByTestId(APP_ID)).length === 1).toBeTruthy();
});

test('renders a Game Point apps with bonus', async () => {
    renderApp(gamePoints(
        {
            size: getRandomNumberInRange(15, 20),
            gamePointsItems: DEFAULT_GAME_POINTS_ITEMS,
            bonuses: [extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.A, 3, 50), extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.B, 2, 30)]
        }
    ));

    expect((await screen.findAllByTestId(APP_ID)).length === 1).toBeTruthy();
});

test('renders a Game Point apps without bonus', async () => {
    renderApp(gamePoints({size: getRandomNumberInRange(15, 20)}));

    expect((await screen.findAllByTestId(APP_ID)).length === 1).toBeTruthy();
});

test('renders a Game Point apps with empty game items', async () => {
    renderApp(gamePoints(
        {
            size: getRandomNumberInRange(15, 20),
            gamePointsItems: [],
            bonuses: [extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.A, 3, 50), extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.B, 2, 30)]
        }
    ));
    expect((await screen.findAllByTestId(APP_ID)).length === 1).toBeTruthy();
});

test('throws an exception on duplicated keys', async () => {
    expect(() => {
        renderApp(gamePoints(
            {
                size: getRandomNumberInRange(15, 20),
                gamePointsItems: [...DEFAULT_GAME_POINTS_ITEMS, DEFAULT_GAME_POINTS_ITEMS[0]]
            }
        ));
    }).toThrow(TypeError);
});

test('throws an exception on non single keys', async () => {
    expect(() => {
        renderApp(gamePoints(
            {
                size: getRandomNumberInRange(20, 30),
                gamePointsItems: [...DEFAULT_GAME_POINTS_ITEMS, {name: "AAA", weight: 15}]
            }
        ));
    }).toThrow(TypeError);
});

test('throws an exception on invalid game point item', async () => {
    expect(() => {
        renderApp(gamePoints({
            board: [{
                gamePointsItem: {name: "AAAA", weight: 1},
                position: 0,
                played: false
            }]
        }));
    }).toThrow(TypeError);
});

//TODO deeper testing, check main, individual and bonus score at every step, randomize clicking on squares and the filling of the board, etc.
describe('plays Game Points game', () => {
    const games: Array<GamePointsTestConfig> = [
        {
            board: getBoard([
                {times: 3, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[0]},
                {times: 2, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[1]},
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[2]},
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[3]}
            ]),
            expectedBonus: 0,
            expectedTotal: 240
        },
        {
            board: getBoard([
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[0]},
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[1]},
                {times: 0, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[2]},
                {times: 0, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[3]}
            ]),
            expectedBonus: 0,
            expectedTotal: 80
        },
        {
            board: getBoard([
                {times: 4, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[0]},
                {times: 2, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[1]},
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[2]},
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[3]}
            ]),
            bonuses: [extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.A, 3, 50), extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.B, 2, 30)],
            expectedBonus: 80,
            expectedTotal: 370
        },
        {
            board: getBoard([
                {times: 4, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[0]},
                {times: 2, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[1]},
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[2]},
                {times: 1, gamePointsItem: DEFAULT_GAME_POINTS_ITEMS[3]}
            ]),
            bonuses: [extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.A, 5, 50), extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.B, 2, 30)],
            expectedBonus: 30,
            expectedTotal: 320
        }
    ];

    for (let i = 0; i < games.length; i++) {
        test('ends a Game Point Game', async () => {
            renderApp(gamePoints({board: games[i].board, bonuses: games[i].bonuses}));

            await waitFor(async () => {
                const squares = (await screen.findAllByTestId(ITEM_SQUARE_ID));

                for (let i = 0; i < squares.length; i++) {
                    await waitFor(async () => {
                        squares[i].click();
                    });
                }
            });

            expect(await getScore() === games[i].expectedTotal).toBeTruthy();
            expect(await getBonus() === games[i].expectedBonus).toBeTruthy();
        });
    }
});

test('throws an exception on negative size', async () => {
    expect(() => {
        renderApp(gamePoints({size: -2}));
    }).toThrow(TypeError);
});