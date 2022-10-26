import Game from "../models/Game";
import {render, screen} from "@testing-library/react";
import App from "../App";
import {TOTAL_POINTS_ID} from "../components/gamePoints/score/GameItemsTotalScoreArea";
import {TOTAL_BONUS_ID} from "../components/gamePoints/score/GamePointsScoreContainer";

const renderApp = (game: Game): void => {
    render(
        <App game={game}/>
    );
};

const getScore = async (): Promise<number> => {
    return parseInt((await screen.findAllByTestId(TOTAL_POINTS_ID))[0].innerHTML);
};

const getBonus = async (): Promise<number> => {
    return parseInt((await screen.findAllByTestId(TOTAL_BONUS_ID))[0].innerHTML);
};

export {renderApp, getBonus, getScore};