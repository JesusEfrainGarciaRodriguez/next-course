import { PokemonsResponse, SimplePokemon } from "@/app/pokemons";
import Image from "next/image";

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
    <div className="flex flex-wrap gap-10 items-center justify-center">
        {pokemons.map(pokemon => (
            <div key={pokemon.id} className="bg-gray-100 rounded-lg p-4">
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                />
                <h2 className="text-2xl font-bold text-gray-800">{pokemon.name}</h2>
                <p className="text-gray-500">ID: {pokemon.id}</p>
            </div>
        ))}
    </div>
  )
}
