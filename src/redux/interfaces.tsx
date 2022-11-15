export type Dispatch = React.Dispatch<IAction>

export interface IRepos {
    id: number
    name: string, 
    full_name: string, 
    description: string, 
    owner: {avatar_url: string}, 
    stargazers_count: number, 
    language: string,
    html_url: string
}

export interface IState {
    repos: Array<IRepos>,
    favorites: Array<IRepos>
}

export interface IAction {
    type: string,
    payload: Array<IRepos> | any
}

export interface IReposProps {
    repos: Array<IRepos>,
    store: {state: IState, dispatch: Dispatch },
    toggleFavAction: (state: IState, dispatch: Dispatch, repo: IRepos) => IAction,
    favorites: Array<IRepos>
}