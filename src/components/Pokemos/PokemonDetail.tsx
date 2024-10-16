import { useEffect, useState } from "react";
import { Pokemon } from "../../models";
import { getPokemon } from "../../requests/pokemons";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  let { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getPokemon(id).then((data) => {
      setPokemon(data);
    });
  }, [id]);

  return (
    <div className="pokemon-detail">
      <h1>{pokemon?.name}</h1>
      <p>ID: {pokemon?.id}</p>
      <p>Tipo: {pokemon?.types[0]}</p>
      <p>Clase: {pokemon?.types[1]}</p>
      <p>Altura: {pokemon?.height}</p>
      <p>Peso: {pokemon?.weight}</p>
      <p>Ataque: {pokemon?.stats.attack}</p>
      <p>Defensa: {pokemon?.stats.defense}</p>
      <p>Velocidad: {pokemon?.stats.speed}</p>
      <p>Especial Ataque: {pokemon?.stats.specialAttack}</p>
      <p>Especial Defensa: {pokemon?.stats.specialDefense}</p>
    </div>
  );
};

export default PokemonDetail;
