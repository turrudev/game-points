import React, {useContext} from 'react';
import {css, StyleSheet} from "aphrodite";
import GridUtils from "../../../utils/GridUtils";
import MessagesManager from "../../../utils/MessagesManager";
import ThemeContext, {ThemeContextResult} from "../../../contexts/ThemeContext";
import GamePointsBoardGrid from "./GamePointsBoardGrid";

const GamePointsBoardContainer = (): JSX.Element => {
    const {theme} = useContext<ThemeContextResult>(ThemeContext),
        styles = StyleSheet.create({
            container: {
                ...GridUtils.defineAndSet("max-content 10px auto", "auto", 1, 1),
                overflow: 'auto'
            },
            header: {
                ...GridUtils.setRowCol(1, 1),
                color: theme.primary,
                border: `1px solid ${theme.secondary}`,
                padding: 5
            }
        });

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.header)}>
                {`${MessagesManager.getMessage("brandName")} ${MessagesManager.getMessage("pointsBoardTitle").toUpperCase()}`}
            </div>
            <GamePointsBoardGrid/>
        </div>
    );
};

export default GamePointsBoardContainer;
