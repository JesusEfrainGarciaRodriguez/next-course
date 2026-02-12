import { PokemonGrid } from "@/pokemons";

export default async function PokemonsPage() {

  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">Pokémons Favoritos <small className="text-blue-500">Estado global</small></span>

      <div className="flex flex-wrap gap-10 items-center justify-center">
          <PokemonGrid pokemons={ [] }/>
      </div>
    </div>
  )
}
