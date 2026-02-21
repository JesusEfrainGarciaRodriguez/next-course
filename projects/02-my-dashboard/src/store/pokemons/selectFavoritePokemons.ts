import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectPokemonsState = (state: RootState) => state.pokemons.favorites;

export const selectFavoritePokemons = createSelector(
  [selectPokemonsState],
  (pokemons) => Object.values(pokemons)
);
