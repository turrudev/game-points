import {css, StyleSheet} from "aphrodite";
import GamePoints from "../../../models/gamePoints/GamePoints";
import GridUtils from "../../../utils/GridUtils";
import GamePointsBoardContainer from "./GamePointsBoardContainer";
import GamePointsPlayContainer from "../score/GamePointsScoreContainer";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setGame} from "../../../store/creators/game.creator";
import {RootState} from "../../../store/store";

export interface GamePointsParameter {
    game: GamePoints;
}

const GamePointsContainer = ({game}: GamePointsParameter): JSX.Element => {
    const dispatch = useDispatch(),
        currentGame: GamePoints = useSelector((state: RootState) => state.game),
        styles = StyleSheet.create({
            container: {
                ...GridUtils.define("auto", "60% 40%"),
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed"
            }
        });

    useEffect(() => {
        dispatch(setGame(game));
    }, [dispatch, game]);

    return (
        <React.Fragment>
            {currentGame.gamePoints && <div className={css(styles.container)}>
                <GamePointsBoardContainer/>
                <GamePointsPlayContainer/>
            </div>}
        </React.Fragment>
    );
};

export default GamePointsContainer;