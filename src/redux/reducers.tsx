import { ActionType } from "./action-types"
import { IAction, IState } from "./interfaces";





const initialState: IState = {
    repos: [],
    favorites: []
}

export const reposReducer = (state: IState = initialState, action: IAction): IState => {
    switch (action.type) {
        case ActionType.GET_REPOS:
            return {
                ...state,
                repos: action.payload
            };
        case ActionType.ADD_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case ActionType.REMOVE_FAVORITES:
            return {
                ...state,
                favorites: action.payload

            }
        default:
            return state
    }

}

export default reposReducer;