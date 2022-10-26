import React, {useContext} from 'react';
import {css, StyleSheet} from "aphrodite";
import GridUtils from "../../../utils/GridUtils";
import ThemeContext, {ThemeContextResult} from "../../../contexts/ThemeContext";
import MessagesManager from "../../../utils/MessagesManager";

const GamePointsScoreColumn = (): JSX.Element => {
    const {theme} = useContext<ThemeContextResult>(ThemeContext),
        styles = StyleSheet.create({
            container: {
                ...GridUtils.defineAndSet("max-content", "auto auto auto", 1, 1),
                textAlign: "center",
                border: `1px solid ${theme.tertiary}`
            },
            item: GridUtils.setRowCol(1, 1),
            times: GridUtils.setRowCol(1, 2),
            score: GridUtils.setRowCol(1, 3)
        });

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.item)}>
                {MessagesManager.getMessage("scoreItems")}
            </div>
            <div className={css(styles.times)}>
                {MessagesManager.getMessage("scoreTotal")}
            </div>
            <div className={css(styles.score)}>
                {MessagesManager.getMessage("scorePoints")}
            </div>
        </div>
    );
};

export default GamePointsScoreColumn;
