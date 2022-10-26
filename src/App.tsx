import {ThemeProvider} from "./contexts/ThemeContext";
import GamePoints, {instanceOfGamePoints} from "./models/gamePoints/GamePoints";
import GamePointsContainer from "./components/gamePoints/board/GamePointsContainer";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Game from "./models/Game";

export const APP_ID = "game-app";

export interface AppStartParameters {
    game: Game | GamePoints;
}

const App = ({game}: AppStartParameters): JSX.Element => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <div data-testid={APP_ID}>
                    {instanceOfGamePoints(game) && <GamePointsContainer game={game}/>}
                </div>
            </ThemeProvider>
        </Provider>
    );
};

export default App;