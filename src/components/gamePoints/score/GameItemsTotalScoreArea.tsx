import React, {useContext} from 'react';
import {css, StyleSheet} from "aphrodite";
import GridUtils from "../../../utils/GridUtils";
import ThemeContext, {ThemeContextResult} from "../../../contexts/ThemeContext";
import MessagesManager from "../../../utils/MessagesManager";
import {useDispatch, useSelector} from "react-redux";
import {setGame} from "../../../store/creators/game.creator";
import {getRandomGamePointsGame} from "../../../utils/GameUtils";
import {RootState} from "../../../store/store";
import GamePointsScore from "../../../models/gamePoints/GamePointsScore";

export const NEW_GAME_ID: string = "new-game", TOTAL_POINTS_ID = "total-points";

const GameItemsTotalScoreArea = (): JSX.Element => {
    const {theme} = useContext<ThemeContextResult>(ThemeContext),
        {total}: GamePointsScore = useSelector((state: RootState) => state.game.score),
        dispatch = useDispatch(),
        styles = StyleSheet.create({
            container: {
                padding: 5,
                ...GridUtils.defineAndSet("max-content", "max-content auto max-content", 4, 1)
            },
            total: GridUtils.setRowCol(1, 1),
            button: {
                ...GridUtils.setRowCol(1, 3),
                cursor: "pointer",
                border: `1px solid ${theme.tertiary}`,
                borderRadius: "50%",
                padding: 5
            }
        });

    function newGame(): void {
        dispatch(setGame(getRandomGamePointsGame()));
    }

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.total)}>
                {`${MessagesManager.getMessage("total")} `}
                <span data-testid={TOTAL_POINTS_ID}>
                    {total}
                </span>
            </div>
            <div className={css(styles.button)} onClick={newGame} data-testid={NEW_GAME_ID}>
                {MessagesManager.getMessage("newGame")}
            </div>
        </div>
    );
};

export default GameItemsTotalScoreArea;
