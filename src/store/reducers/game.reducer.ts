import {GameActionCreator} from "../creators/game.creator";
import {SCORE_ITEM, SET_GAME} from "../actions/game.actions";
import GamePointsSquare from "../../models/gamePoints/GamePointsSquare";
import {GamePointsIndividualScore} from "../../models/gamePoints/GamePointsScore";
import GamePoints, {gamePoints} from "../../models/gamePoints/GamePoints";

const gameReducer = (state: GamePoints = gamePoints({size: 0}), action: GameActionCreator): GamePoints => {
    switch (action.type) {
        case SET_GAME: {
            return {
                ...action.game
            };
        }
        case SCORE_ITEM: {
            const selectedSquare: GamePointsSquare = state.board[action.position],
                selectedItem = selectedSquare.gamePointsItem,
                currentScore: GamePointsIndividualScore = state.score.individuals[selectedItem.name] || {
                    score: 0,
                    times: 0
                },
                amountToIncrease = action.weight + action.bonus;

            return {
                ...state,
                board: {
                    ...state.board,
                    [action.position]: {
                        ...selectedSquare,
                        played: true
                    }
                },
                score: {
                    ...state.score,
                    total: state.score.total + amountToIncrease,
                    individuals: {
                        ...state.score.individuals,
                        [selectedItem.name]: {
                            score: currentScore.score + amountToIncrease,
                            times: currentScore.times + 1
                        }
                    },
                    totalBonus: state.score.totalBonus + action.bonus
                },
                plays: [action.position, ...state.plays]
            };
        }
        default:
            return state;
    }
};

export default gameReducer;
