import { useContext } from "react";
import { api, BASE_URL } from "../services/axios"
import { ActionType } from "./action-types";
import { IAction, IRepos, IState, } from "./interfaces";


export const loadingAction = (status: IState | any) => {

    return {
        type: ActionType.TOGGLE_LOADING,
        payload: status
    }
}
export const getRepos = async (dispatch: any) => {

    try {

        const response = await api.get(`/appswefit/repos`);

        return dispatch({
            type: ActionType.GET_REPOS,
            payload: response.data
        })

    } catch (error) {
        console.log(error)
    } 


}

export const toggleFavAction = (state: IState, dispatch: any, repo: IRepos | any): IAction => {
    const repoInFavorites = state.favorites.includes(repo);
    const favWithoutRepo = state.favorites.filter((fav: IRepos) => fav.id !== repo.id);

    let dispatchObj = {
        type: ActionType.ADD_FAVORITES,
        payload: repo
    }

    if (repoInFavorites) {
        dispatchObj = {
            type: ActionType.UNFAVORITE,
            payload: favWithoutRepo
        }
        
        
    }
    return dispatch(dispatchObj)
}






