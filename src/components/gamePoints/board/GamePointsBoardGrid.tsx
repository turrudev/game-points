import React from 'react';
import {css, StyleSheet} from "aphrodite";
import GridUtils from "../../../utils/GridUtils";
import GamePointsItemSquare from "./GamePointsItemSquare";
import MediaQueryUtils from "../../../utils/MediaQueryUtils";
import GamePoints from "../../../models/gamePoints/GamePoints";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

const GamePointsBoardGrid = (): JSX.Element => {
    const {board}: GamePoints = useSelector((state: RootState) => state.game),
        styles = StyleSheet.create({
            container: {
                ...GridUtils.defineAndSet(`max-content`, "repeat(auto-fit, minmax(100px, 300px))", 3, 1),
                overflowY: "auto",
                gap: 25,
                justifyContent: "center",
                cursor: "pointer",
                height: "fit-content",
                ...MediaQueryUtils.ipadLandscape({
                    ...GridUtils.defineAndSet(`max-content`, "repeat(auto-fit, minmax(100px, 150px))", 3, 1)
                }),
                ...MediaQueryUtils.ipadPortrait({
                    ...GridUtils.defineAndSet(`max-content`, "repeat(auto-fit, minmax(100px, 120px))", 3, 1)
                })
            }
        });

    return (
        <div className={css(styles.container)}>
            {Object.entries(board).map(([key, square]) =>
                <React.Fragment key={`${key}-${square.gamePointsItem.name}`}>
                    {!square.played && <GamePointsItemSquare gamePointsItemSquare={square} key={key}/>}
                </React.Fragment>
            )}
        </div>
    );
};

export default GamePointsBoardGrid;
