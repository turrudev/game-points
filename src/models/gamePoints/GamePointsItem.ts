import AttributesCheck from "../AttributesCheck";

const ATTRIBUTES_ERROR_MESSAGES: AttributesCheck = {
    name: {
        length: "The name string must be a single character...",
        uppercase: "The name string must be a single and uppercase...",
    }
};

export type GamePointsItem = {
    readonly name: string;
    readonly weight: number;
};

function getSanitizedName(name: string): string {
    if (name.length !== 1) throw new TypeError(ATTRIBUTES_ERROR_MESSAGES.name.length);
    if (name !== name.toUpperCase()) throw new TypeError(ATTRIBUTES_ERROR_MESSAGES.name.uppercase);

    return name.toUpperCase();
}

function getSanitizedWeight(weight: number): number {
    return Math.round(weight);
}

const gamePointsItem = (name: string, weight: number): GamePointsItem => {
    return {name: getSanitizedName(name), weight: getSanitizedWeight(weight)};
};

export {gamePointsItem};