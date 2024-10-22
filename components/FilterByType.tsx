"use client";

import { useRouter } from "next/navigation";
import { PokemonType } from "../types/pokemon";
import React, { memo, useCallback, useState } from "react";
import debounce from "lodash/debounce";

interface FilterByTypeProps {
  types: PokemonType[];
  count: number;
  selectedTypes?: string[];
}

const FilterByType = ({
  types,
  count = 0,
  selectedTypes,
}: FilterByTypeProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(selectedTypes || []);

  const updateFilter = useCallback(
    (updatedSelection: string[]) => {
      const debouncedUpdate = debounce(() => {
        const typeQuery = updatedSelection.map((t) => `type=${t}`).join("&");
        router.push(`/?${typeQuery}&page=1`);
      }, 300);
      debouncedUpdate();
    },
    [router]
  );

  const toggleType = (type: string) => {
    let updatedSelection;
    if (selected.includes(type)) {
      updatedSelection = selected.filter((t) => t !== type);
    } else {
      updatedSelection = [...selected, type];
    }
    setSelected(updatedSelection);
    updateFilter(updatedSelection);
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex items-center mx-4 my-4">
        <div className="mr-2 my-4 font-bold self-start">Types:</div>
        <div>
          {types?.map((type) => (
            <button
              key={type.name}
              onClick={() => toggleType(type.name)}
              className={`px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold bg-red-900px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold text-red-900
            ${selected.includes(type.name) ? "text-white bg-red-900" : ""}`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
      {count > 0 && (
        <div className="my-12 mx-4 font-bold">{`${count} results found.`}</div>
      )}
    </div>
  );
};

export default memo(FilterByType);
