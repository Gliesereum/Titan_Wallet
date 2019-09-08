import { AsyncStorage } from 'react-native';
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import ReduxPromise from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from "./reducers";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
};

let rootReducers = combineReducers({
    ...reducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
    persistedReducer,
    compose(applyMiddleware(ReduxPromise, thunk))
);

let persistor = persistStore(store);

export {store, persistor};
