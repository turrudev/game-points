import React, {useContext} from 'react';
import {css, StyleSheet} from "aphrodite";
import GridUtils from "../../../utils/GridUtils";
import MessagesManager from "../../../utils/MessagesManager";
import ThemeContext, {ThemeContextResult} from "../../../contexts/ThemeContext";
import GamePointsScoreGrid from "./GamePointsScoreGrid";
import GameItemsTotalScoreArea from "./GameItemsTotalScoreArea";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import GamePointsScore from "../../../models/gamePoints/GamePointsScore";

export const TOTAL_BONUS_ID = "total-bonus";

const GamePointsScoreContainer = (): JSX.Element => {
    const {theme} = useContext<ThemeContextResult>(ThemeContext),
        {totalBonus}: GamePointsScore = useSelector((state: RootState) => state.game.score),
        styles = StyleSheet.create({
            container: {
                ...GridUtils.defineAndSet("max-content auto max-content auto", "auto", 1, 2),
                borderLeft: `1px solid ${theme.secondary}`
            },
            header: {
                ...GridUtils.setRowCol(1, 1),
                color: theme.primary,
                border: `1px solid ${theme.secondary}`,
                padding: 5,
                textAlign: "center",
                borderLeft: 0
            },
            bonus: {
                ...GridUtils.setRowCol(3, 1),
                border: `1px solid ${theme.secondary}`
            }
        });

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.header)}>
                {MessagesManager.getMessage("playerItemsTitle").toUpperCase()}
            </div>
            <GamePointsScoreGrid/>
            <div className={css(styles.bonus)}>
                {`${MessagesManager.getMessage("bonus")} - `}
                <span data-testid={TOTAL_BONUS_ID}>
                    {totalBonus}
                </span>
            </div>
            <GameItemsTotalScoreArea/>
        </div>
    );
};

export default GamePointsScoreContainer;
