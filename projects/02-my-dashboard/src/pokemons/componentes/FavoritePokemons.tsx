'use client'

import { PokemonGrid } from "./PokemonGrid"
import { useAppSelector } from '../../store/index';
import { selectFavoritePokemons } from "@/store/pokemons/selectFavoritePokemons";

export const FavoritePokemons = () => {
    const favoritesPokemons = useAppSelector(selectFavoritePokemons);

    if (favoritesPokemons.length === 0) {
        return <NoFavorites />
    }

    return (
        <PokemonGrid pokemons={ favoritesPokemons }/>
    )
}

export const NoFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-2xl my-2">No tienes pokémons favoritos</span>
      <span className="text-sm text-gray-500">Agrega pokémons a favoritos para que aparezcan aquí</span>
    </div>
  )
}
