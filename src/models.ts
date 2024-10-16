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

type AppState = {
  pokemons: Pokemon[];
  searchQuery: string;
  combatReady: Pokemon[];
};

export type { AppState, Pokemon };
