import React from 'react';
import {cleanup, screen} from '@testing-library/react';
import {StyleSheetTestUtils} from "aphrodite";
import {gamePoints} from "../../../models/gamePoints/GamePoints";
import {ITEM_SQUARE_ID} from "./GamePointsItemSquare";
import {renderApp} from "../../../tests/TestUtils";

afterEach(cleanup);

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

describe('Creating multiple boards', () => {
    const sizes = [1, 2, 8, 12];

    for (let i = 0; i < sizes.length; i++) {
        test('renders as many squares as specified', async () => {
            renderApp(gamePoints({size: sizes[i]}));
            expect((await screen.findAllByTestId(ITEM_SQUARE_ID)).length === sizes[i]).toBeTruthy();
        });
    }
});