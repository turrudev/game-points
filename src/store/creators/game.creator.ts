import Game from "../../models/Game";
import {SCORE_ITEM, SET_GAME} from "../actions/game.actions";

export type GameActionCreator = {
    type: string,
    [key: string]: any
}

const setGame = (game: Game): GameActionCreator => ({type: SET_GAME, game}),
    scoreItem = (position: number, weight: number, bonus: number = 0): GameActionCreator => ({type: SCORE_ITEM, position, weight, bonus});

export {setGame, scoreItem};