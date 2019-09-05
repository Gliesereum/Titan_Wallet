import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import ReduxPromise from 'redux-promise';
import reducers from "./reducers";

const store = createStore(
    combineReducers({
        ...reducers,
    }),
    compose(applyMiddleware(ReduxPromise, thunk))
);

export {store};
