import {cleanup, screen, waitFor} from '@testing-library/react';
import {StyleSheetTestUtils} from "aphrodite";
import {gamePoints} from "../../../models/gamePoints/GamePoints";
import {NEW_GAME_ID} from "./GameItemsTotalScoreArea";
import {ITEM_SQUARE_ID} from "../board/GamePointsItemSquare";
import {getScore, renderApp} from "../../../tests/TestUtils";

afterEach(cleanup);

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

test('renders the new button', async () => {
    renderApp(gamePoints({size: 5}));

    const button = (await screen.findAllByTestId(NEW_GAME_ID))[0];
    expect(button).toBeInTheDocument();
});

// TODO check more properties of the game like plays, board items, individual scores, game ID, etc.
test('cleans the game', async () => {
    renderApp(gamePoints({size: 5}));

    await waitFor(async () => {
        expect((await getScore()) === 0).toBeTruthy();
    });

    await waitFor(async () => {
        const squares = (await screen.findAllByTestId(ITEM_SQUARE_ID));

        for (let i = 0; i < squares.length; i++) {
            squares[i].click();
        }

        expect((await getScore()) !== 0).toBeTruthy();
    });

    await waitFor(async () => {
        const button = (await getButton())[0];
        button.click();

        expect((await getScore()) === 0).toBeTruthy();
    });
});

const getButton = async (): Promise<Array<HTMLElement>> => {
    return screen.findAllByTestId(NEW_GAME_ID);
};