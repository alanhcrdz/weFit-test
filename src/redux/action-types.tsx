export enum ActionType {
    GET_REPOS = "GET_REPOS",
    ADD_FAVORITES = "ADD_FAVORITES",
    REMOVE_FAVORITES = "REMOVE_FAVORITES",
    TOGGLE_LOADING = "TOGGLE_LOADING"
}

interface GetReposAction {
    type: ActionType.GET_REPOS,
    payload: string
}

interface AddFavoriteAction {
    type: ActionType.ADD_FAVORITES,
    payload: string
}

interface RemoveFavoriteAction {
    id: string,
    type: ActionType.REMOVE_FAVORITES,
    payload: string
}
interface LoadAction {
    type: ActionType.TOGGLE_LOADING,
    payload: boolean
}

export type Action = GetReposAction | AddFavoriteAction | RemoveFavoriteAction | LoadAction