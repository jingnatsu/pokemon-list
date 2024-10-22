// app/page.tsx
import axios from "axios";
import PokemonList from "../components/PokemonList";
import FilterByType from "../components/FilterByType";
import Pagination from "../components/Pagination";
import {
  Pokemon,
  PokemonListResponse,
  PokemonResponse,
  PokemonType,
} from "../types/pokemon";

export const POKEMON_API_URL = "https://pokeapi.co/api/v2";
export const LIMIT_ITEMS = 48;

async function fetchPokemonByType(type: string) {
  const { data } = await axios.get(`${POKEMON_API_URL}/type/${type}`);
  return data.pokemon.map((p: PokemonResponse) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
    id: parseInt(p.pokemon.url.split("/").slice(-2, -1)[0], 10),
  }));
}

export function intersectPokemons(
  lists: { name: string; url: string; id: number }[][]
) {
  return lists.reduce((acc, list) => {
    return acc.filter((pokemon) => list.some((p) => p.name === pokemon.name));
  });
}

export async function fetchPokemonList(
  page: number,
  selectedTypes: string[]
): Promise<PokemonListResponse> {
  if (selectedTypes.length === 0) {
    const offset = (page - 1) * LIMIT_ITEMS;
    const { data } = await axios.get(
      `${POKEMON_API_URL}/pokemon?limit=${LIMIT_ITEMS}&offset=${offset}`
    );
    const results = data.results.map((p: Pokemon) => ({
      ...p,
      id: parseInt(p.url.split("/").slice(-2, -1)[0], 10),
    }));
    return { results, count: data.count };
  }

  // Fetch Pokémon for each type
  const allResults = await Promise.all(selectedTypes.map(fetchPokemonByType));

  // AND logic: Find Pokémon that exist in all selected types
  const filteredPokemon = allResults.reduce((acc, currentType) =>
    acc.filter((pokemon: Pokemon) =>
      currentType.some((p: Pokemon) => p.id === pokemon.id)
    )
  );

  const offset = (page - 1) * LIMIT_ITEMS;
  const paginatedResults = filteredPokemon.slice(offset, offset + LIMIT_ITEMS);

  return { results: paginatedResults, count: filteredPokemon.length };
}

export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  const { data } = await axios.get(`${POKEMON_API_URL}/type`);
  return data.results;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { type?: string | string[]; page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const selectedTypes = Array.isArray(searchParams.type)
    ? (searchParams.type.filter(Boolean) as string[])
    : ([searchParams.type].filter(Boolean) as string[]);

  const [pokemonList, types] = await Promise.all([
    fetchPokemonList(page, selectedTypes),
    fetchPokemonTypes(),
  ]);

  return (
    <div>
      <FilterByType
        types={types}
        selectedTypes={selectedTypes}
        count={pokemonList.count}
      />
      <PokemonList pokemons={pokemonList.results} />
      <Pagination currentPage={page} total={pokemonList.count} />
    </div>
  );
}
