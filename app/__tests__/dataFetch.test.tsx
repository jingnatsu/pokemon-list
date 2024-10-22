// app/__tests__/fetchPokemonList.test.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchPokemonList, LIMIT_ITEMS } from "@/app/page"; // Adjust path if needed

const mock = new MockAdapter(axios);

describe("Data Fetching", () => {
  afterEach(() => {
    mock.reset(); // Reset mock after each test to prevent conflicts
  });
  it("fetches Pokémon list with pagination", async () => {
    const mockResponse = {
      count: 2,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      ],
    };
    const page = 1;
    const offset = (page - 1) * LIMIT_ITEMS;
    mock
      .onGet(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_ITEMS}&offset=${offset}`
      )
      .reply(200, mockResponse);
    const result = await fetchPokemonList(page, []);
    expect(result).toEqual({
      results: [
        {
          name: "bulbasaur",
          id: 1,
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        { name: "ivysaur", id: 2, url: "https://pokeapi.co/api/v2/pokemon/2/" },
      ],
      count: 2,
    });
  });
  it("handles 404 error gracefully", async () => {
    const page = 1;
    const offset = (page - 1) * 20;
    // Mock a 404 response
    mock
      .onGet(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .reply(404);
    await expect(fetchPokemonList(page, [])).rejects.toThrow(
      "Request failed with status code 404"
    );
  });
});
