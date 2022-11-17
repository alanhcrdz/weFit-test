import { createContext, useReducer, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';

import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import  thunk from 'redux-thunk';
import { IState } from './interfaces';
import reposReducer, { initialState } from './reducers';

//import reposReducer from "./reducers";

/*  const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["favorites"],
}  */


/*  const rootReducer = combineReducers({
    // @ts-ignore
    reposReducer: persistReducer(persistConfig, reposReducer)
})  */

 export const Store = createContext<IState | any>(initialState);

 export function StoreProvider({ children }:JSX.ElementChildrenAttribute | any):  JSX.Element {
    const [state, dispatch] = useReducer(reposReducer, initialState);
    const [user, setUser] = useState('appswefit');

    return (
        <Store.Provider value={{state, dispatch, user, setUser}} >
            {children}
        </Store.Provider>
    )
}  
//export const store = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
 //export const persistor = persistStore(store)

//export type State = ReturnType<typeof store.getState> // assign to state
//export type AppDispatch = typeof store.dispatch 
