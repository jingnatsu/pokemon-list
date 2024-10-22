import React, { memo, useMemo } from "react";
import { Pokemon } from "../types/pokemon";
import Image from "next/image";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const IMAGE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const PokemonList = ({ pokemons }: PokemonListProps) => {
  const sortedPokemons = useMemo(
    () => pokemons?.sort((a, b) => a.id - b.id),
    [pokemons]
  );

  if (!pokemons?.length) {
    return (
      <div className="text-center text-3xl mx-auto my-24 font-bold">
        No results found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {sortedPokemons?.map((p) => {
        const imageUrl = `${IMAGE_URL}/${p.id}.png`;

        return (
          <div key={p.name}>
            <div className="h-24 w-24 mx-auto">
              <Image
                src={imageUrl}
                alt={p.id.toString()}
                width={100}
                height={100}
                loading="lazy"
              />
            </div>
            <div className="text-center">{p.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(PokemonList);
