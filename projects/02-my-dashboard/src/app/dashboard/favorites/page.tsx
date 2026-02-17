import { FavoritePokemons } from "@/pokemons/componentes/FavoritePokemons";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'Pokémons Favoritos',
  description: 'Listado de pokémons favoritos usando estado global con Redux Toolkit'
}

export default function PokemonsPage() {

  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">Pokémons Favoritos <small className="text-blue-500">Estado global</small></span>

      <div className="flex flex-wrap gap-10 items-center justify-center">
          <FavoritePokemons />
      </div>
    </div>
  )
}
