import { createContext, useReducer } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';

import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import  thunk from 'redux-thunk';
import { IState } from './interfaces';
import reposReducer, { initialState } from './reducers';

//import reposReducer from "./reducers";

 const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["favorites"],
} 


 



export const Store = createContext<IState | any>(initialState);

export function StoreProvider({ children }:JSX.ElementChildrenAttribute | any):  JSX.Element {
    const [state, dispatch] = useReducer(reposReducer, initialState);

    return (
        <Store.Provider value={{state, dispatch}} >
            {children}
        </Store.Provider>
    )
}

//export const persistor = persistStore(Store)
/* export const store = createStore(rootReducer, applyMiddleware(thunk));
export type State = ReturnType<typeof reposReducer> // assign to state
export type AppDispatch = typeof store.dispatch */
