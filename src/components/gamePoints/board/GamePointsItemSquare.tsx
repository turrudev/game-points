import React, {useContext} from 'react';
import {css, StyleSheet} from "aphrodite";
import ThemeContext, {ThemeContextResult} from "../../../contexts/ThemeContext";
import {useDispatch, useSelector} from "react-redux";
import {scoreItem} from "../../../store/creators/game.creator";
import GamePointsSquare from "../../../models/gamePoints/GamePointsSquare";
import GamePoints from "../../../models/gamePoints/GamePoints";
import {RootState} from "../../../store/store";

export const ITEM_SQUARE_ID = "item-square";

interface GamePointsItemSquareParams {
    gamePointsItemSquare: GamePointsSquare;
}

const GamePointsItemSquare = ({gamePointsItemSquare}: GamePointsItemSquareParams): JSX.Element => {
    const {theme} = useContext<ThemeContextResult>(ThemeContext),
        dispatch = useDispatch(),
        game: GamePoints = useSelector((state: RootState) => state.game),
        styles = StyleSheet.create({
            container: {
                color: theme.primary,
                border: `1px solid ${theme.tertiary}`,
                maxWidth: 200,
                height: 150,
                textAlign: "center",
                alignContent: "center",
                display: "grid"
            },
        });

    function selectSquare(): void {
        let totalBonus: number = 0;

        for (let i = 0; i < game.bonuses.length; i++) {
            totalBonus += game.bonuses[i].get(game, gamePointsItemSquare.gamePointsItem);
        }

        dispatch(scoreItem(gamePointsItemSquare.position, gamePointsItemSquare.gamePointsItem.weight, totalBonus));
    }

    return (
        <div className={css(styles.container)} onClick={selectSquare} data-testid={gamePointsItemSquare.played ? "" : ITEM_SQUARE_ID}>
            {gamePointsItemSquare.gamePointsItem.name}
        </div>
    );
};

export default GamePointsItemSquare;
