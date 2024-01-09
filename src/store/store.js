import { applyMiddleware, createStore } from "redux";
import gameReducer from "./reducers";
import createSagaMiddleWare from "redux-saga";
import watcherSagas from "./saga";

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(gameReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSagas);
export default store;
