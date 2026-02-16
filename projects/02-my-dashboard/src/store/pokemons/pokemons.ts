import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonsState {
    [key: string]: SimplePokemon;
}

const initialState: PokemonsState = {
    '1': {
        id: '1',
        name: 'bulbasaur',
    }
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
        const pokemon: SimplePokemon = action.payload;
        const { id } = pokemon;
        if (!!state[id]) {
            delete state[id];
            return;
        } 

        state[pokemon.id] = pokemon;
    }
  }
});

export const { toggleFavorite } = pokemonsSlice.actions

export default pokemonsSlice.reducer