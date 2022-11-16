import { api } from "../services/axios"
import { ActionType } from "./action-types";
import { IAction, IRepos, IState, } from "./interfaces";


export const loadingAction = (status: IState | any) => {
    return {
        type: ActionType.TOGGLE_LOADING,
        payload: status
    }
}
export const getRepos = async (dispatch: any) => {
    dispatch(loadingAction(true))
    try {

        const response = await api.get('/appswefit/repos');

        return dispatch({
            type: ActionType.GET_REPOS,
            payload: response.data
        })

    } catch (error) {
        console.log(error)
    } finally {
        dispatch(loadingAction(false))

    }
    

}

export const toggleFavAction = (state: IState, dispatch: any, repo: IRepos | any): IAction => {
    const repoInFavorites = state.favorites.includes(repo);

    let dispatchObj = {
        type: ActionType.ADD_FAVORITES,
        payload: repo
    }

    if (repoInFavorites) {
        const favWithoutRepo = state.favorites.filter((fav: IRepos) => fav.id !== repo.id);
        dispatchObj = {
            type: ActionType.REMOVE_FAVORITES,
            payload: favWithoutRepo
        }
    }
    return dispatch(dispatchObj)
}



