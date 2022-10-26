import Bonus from "../Bonus";
import GamePoints from "./GamePoints";
import {GamePointsItem} from "./GamePointsItem";

export default interface GamePointsBonus extends Bonus {
    gameItemKey: string;
    appearances: number;
    bonusWeight: number;
}

const extraLetterBonus = (gameItemKey: string, appearances: number, bonusWeight: number): GamePointsBonus => {
    return {
        get(game: GamePoints, gamePointItem: GamePointsItem): number {
            if (gamePointItem.name === this.gameItemKey) {
                const amountOfAppearances = game.score.individuals[this.gameItemKey]?.times || 0;

                if (amountOfAppearances > 0) {
                    return (amountOfAppearances + 1) % appearances === 0 ? bonusWeight : 0;
                }

            }
            return 0;
        },
        gameItemKey,
        appearances,
        bonusWeight
    };
};

export {extraLetterBonus};