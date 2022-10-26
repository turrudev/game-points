import React from 'react';
import {css, StyleSheet} from "aphrodite";
import GridUtils from "../../../utils/GridUtils";
import GamePointsScoreColumns from "./GamePointsScoreColumns";
import GamePoints from "../../../models/gamePoints/GamePoints";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import GamePointsScoreItem from "./GamePointsScoreItem";

const GamePointsScoreGrid = (): JSX.Element => {
    const {score}: GamePoints = useSelector((state: RootState) => state.game),
        styles = StyleSheet.create({
            container: GridUtils.defineAndSet("max-content minmax(500px, auto)", "auto", 2, 1),
            grid: {
                ...GridUtils.setRowCol(2, 1),
                overflowY: "auto"
            }
        }),
        keysSorted: Array<string> = Object.keys(score.individuals).sort(function (a, b) {
            return score.individuals[b].score - score.individuals[a].score
        });

    return (
        <div className={css(styles.container)}>
            <GamePointsScoreColumns/>
            <div className={css(styles.grid)}>
                {keysSorted.map((key, index) =>
                    <GamePointsScoreItem key={`${index}-${key}`} score={score.individuals[key]} scoredItemKey={key}/>
                )}
            </div>
        </div>
    );
};

export default GamePointsScoreGrid;
