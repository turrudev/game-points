import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import game from "./reducers/game.reducer";
import LogMiddleware from "./middlewares/log.middleware";

export const store = configureStore({
    reducer: combineReducers({game}),
    middleware: [LogMiddleware]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;