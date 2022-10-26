import React from 'react';
import {css, StyleSheet} from "aphrodite";
import GridUtils from "../../../utils/GridUtils";
import {GamePointsIndividualScore} from "../../../models/gamePoints/GamePointsScore";

interface GamePointsScoreItemProps {
    score: GamePointsIndividualScore,
    scoredItemKey: string
}

const GamePointsScoreItem = ({score, scoredItemKey}: GamePointsScoreItemProps): JSX.Element => {
    const styles = StyleSheet.create({
        container: {
            ...GridUtils.define("max-content", "auto auto auto"),
            textAlign: "center"
        },
        item: GridUtils.setRowCol(1, 1),
        times: GridUtils.setRowCol(1, 2),
        score: GridUtils.setRowCol(1, 3)
    });

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.item)}>
                {scoredItemKey}
            </div>
            <div className={css(styles.times)}>
                {score.times}
            </div>
            <div className={css(styles.score)}>
                {score.score}
            </div>
        </div>
    );
};

export default GamePointsScoreItem;
