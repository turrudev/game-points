import Score from "../Score";

export interface GamePointsIndividualScore {
    score: number;
    times: number;
}

export default interface GamePointsScore extends Score {
    totalBonus: number;
    readonly individuals: Record<string, GamePointsIndividualScore>;
};