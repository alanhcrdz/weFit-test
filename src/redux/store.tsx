import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';

import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import  thunk from 'redux-thunk';

import reposReducer from "./reducers";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["favorites"],
}

const rootReducer = combineReducers({
    reposReducer: persistReducer(persistConfig, reposReducer)
    
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)
export type State = ReturnType<typeof reposReducer> // assign to state
export type AppDispatch = typeof store.dispatch
