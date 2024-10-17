type Pokemon = {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  stats: {
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
};

interface PokemonItem {
  id: number;
  name: string;
  image: string;
}

type AppState = {
  pokemons: Pokemon[];
  searchQuery: string;
  combatReady: Pokemon[];
};

export type { AppState, Pokemon, PokemonItem };
