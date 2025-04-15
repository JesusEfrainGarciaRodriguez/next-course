import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/app/pokemons";

const getPokemons = async (limit = 20, offset = 0):Promise<SimplePokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data:PokemonsResponse = await response.json();
    
  const pokemons = data.results.map((pokemon) => {
    return {
      id: pokemon.url.split('/').at(-2) || '',
      name: pokemon.name
    }
  });

  return pokemons;
}

export default async function PokemonsPage() {
    const pokemons = await getPokemons();

  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">Listado de Pokémons <small>estáticos</small></span>

      <div className="flex flex-wrap gap-10 items-center justify-center">
          <PokemonGrid pokemons={pokemons}/>
      </div>
    </div>
  )
}
