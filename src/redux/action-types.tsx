export enum ActionType {
    GET_REPOS = "GET_REPOS",
    ADD_FAVORITES = "ADD_FAVORITES",
    UNFAVORITE = "UNFAVORITE",
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

interface UnfavoriteAction {
    id: string,
    type: ActionType.UNFAVORITE,
    payload: string
}


interface LoadAction {
    type: ActionType.TOGGLE_LOADING,
    payload: boolean
}

export type Action = GetReposAction | AddFavoriteAction | UnfavoriteAction | LoadAction