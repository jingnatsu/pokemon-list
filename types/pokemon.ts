export interface Pokemon {
  id: number;
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface TypeResponse {
  results: PokemonType[];
}

export interface PokemonResponse {
  pokemon: Pokemon;
}
