import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const localStorageMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    next(action);

    if (action.type === 'pokemons/toggleFavorite') {
        const { pokemons } = store.getState() as RootState;
        localStorage.setItem('pokemons', JSON.stringify(pokemons));
    }
}