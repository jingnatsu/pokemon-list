import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonList from "@/components/PokemonList";
import { POKEMON_API_URL } from "../page";

const mockPokemons = [
  { name: "bulbasaur", url: `${POKEMON_API_URL}/pokemon/1/`, id: 1 },
  { name: "charmander", url: `${POKEMON_API_URL}/pokemon/4/`, id: 4 },
];

describe("PokemonList Component", () => {
  it("renders a list of Pokémon", () => {
    render(<PokemonList pokemons={mockPokemons} />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });
});
