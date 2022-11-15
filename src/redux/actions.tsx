import { api } from "../services/axios"
import { Action, ActionType } from "./action-types";
import { Dispatch } from "redux";
import { IAction, IRepos, IState, } from "./interfaces";

export const getRepos = () => {
    try {
        return async (dispatch: Dispatch | any) => {
            const response = await api.get('/alanhcrdz/repos');
            if (response.data) {
                dispatch({
                    type: ActionType.GET_REPOS,
                    payload: response.data,
                });

            } else {
                console.log('Erro ao tentar buscar dados da API!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const toggleFavAction = (state: IState) => (dispatch: Dispatch, repo: IRepos | any): IAction => {
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

/* export const removeRepoFromFavorites = (repo: string) => (dispatch: Dispatch<Action>) => {
    dispatch({
        id: repo,
        type: ActionType.REMOVE_FAVORITES,
        payload: repo
    })
} */