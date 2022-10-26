import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {DEFAULT_GAME_POINTS_ITEMS_KEY, gamePoints} from "./models/gamePoints/GamePoints";
import {getRandomNumberInRange} from "./utils/RandomUtils";
import {extraLetterBonus} from "./models/gamePoints/GamePointsBonus";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App game={gamePoints({
                size: getRandomNumberInRange(15, 20),
                bonuses: [extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.A, 3, 50), extraLetterBonus(DEFAULT_GAME_POINTS_ITEMS_KEY.B, 2, 30)]
            }
        )}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();