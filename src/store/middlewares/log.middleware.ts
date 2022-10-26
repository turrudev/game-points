import {Middleware} from "@reduxjs/toolkit";
import {store} from "../store";

export const LogMiddleWare: Middleware = api => next => action => {
    log('dispatching', action, action.type);
    const result = next(action);
    log('next state', store.getState());
    return result;
};

function log(...args: any): void {
    if (window.location.href.indexOf("localhost:") >= 0) console.log(...args);
}

export default LogMiddleWare;
