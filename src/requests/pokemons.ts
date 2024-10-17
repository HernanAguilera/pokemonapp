export const getPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  return data;
};

export const getPokemon = async (id: string | number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      return Promise.reject(response);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};
