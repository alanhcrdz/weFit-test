import { ActionType } from "./action-types"
import { IAction, IState } from "./interfaces";

export const initialState: IState = {
    repos: [],
    favorites: [],
    showLoading: false,
}

export function reposReducer (state: IState, action: IAction): IState {
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
        case ActionType.UNFAVORITE:
            return {
                ...state,
                favorites: action.payload

            }
                case ActionType.TOGGLE_LOADING:
                return {
                    ...state,
                    showLoading: action.payload
                }
        default:
            return state
    }

}

export default reposReducer;