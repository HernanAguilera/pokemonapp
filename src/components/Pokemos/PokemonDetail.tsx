import { useEffect, useState } from "react";
import { Pokemon, PokemonItem } from "../../models";
import { getPokemon } from "../../requests/pokemons";
import { Link, useParams } from "react-router-dom";
import { setLoading } from "../../state/generalSlice";
import {
  addToreadyToBattle,
  removeToreadyToBattle,
  setPokemons,
} from "../../state/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Pokemon.css";
import ReadyToBattle from "./readyToBattle";
import { capitalize } from "../../utils";

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState<Pokemon>();
  let { id } = useParams();

  const readyToBattle = useSelector(
    (state: any) => state.pokemons.readyToBattle
  );

  const originalPokemons = useSelector(
    (state: any) => state.pokemons.originalPokemons
  );

  const isReadyToBattle = (): boolean => {
    if (!pokemon || !readyToBattle) return false;
    return readyToBattle.some((item: PokemonItem) => item.id === pokemon.id);
  };

  const addPokemonToBattle = () => {
    dispatch(addToreadyToBattle([...readyToBattle, pokemon]));
  };

  const removePokemonFromBattle = () => {
    dispatch(removeToreadyToBattle(pokemon?.id));
  };

  useEffect(() => {
    if (!id) return;
    dispatch(setLoading(true));
    dispatch(setPokemons(originalPokemons));
    getPokemon(id)
      .then((data) => {
        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type: any) => capitalize(type.type.name)),
          stats: {
            attack: data.stats[0].base_stat,
            defense: data.stats[1].base_stat,
            speed: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
          },
        };

        setPokemon(pokemon);
      })
      .catch((error) => {
        console.log(error);
        setPokemon(undefined);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [id]);

  console.log({ pokemon });

  return (
    <>
      <div className="container">
        <div className="detail-content">
          <div className="detail-header">
            <div className="back-button">
              <Link to="/">← Volver</Link>
            </div>
            <div className="pokemon-image-large">
              <img
                src={pokemon?.image}
                alt={`${pokemon?.id ? capitalize(pokemon?.name) : ""}`}
              />
              <h1
                style={{
                  marginBottom: "10px",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                {pokemon?.id ? capitalize(pokemon?.name) : "No encontrado"}
              </h1>
            </div>
            <div>
              {pokemon?.id &&
                (isReadyToBattle() ? (
                  <button
                    className="remove-to-list"
                    onClick={() => removePokemonFromBattle()}
                  >
                    Quitar de la lista
                  </button>
                ) : (
                  <button
                    className="add-to-list"
                    onClick={() => addPokemonToBattle()}
                  >
                    Agregar a la lista
                  </button>
                ))}
            </div>
          </div>
          <div className="pokemon-details">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className="label">Tipo:</td>
                  <td className="value">{pokemon?.types.join(", ")}</td>
                </tr>
                <tr>
                  <td className="label">Altura:</td>
                  <td className="value">{pokemon?.height}</td>
                </tr>
                <tr>
                  <td className="label">Peso:</td>
                  <td className="value">{pokemon?.weight}</td>
                </tr>
                <tr>
                  <td className="label">Ataque:</td>
                  <td className="value">{pokemon?.stats.attack}</td>
                </tr>
                <tr>
                  <td className="label">Defensa:</td>
                  <td className="value">{pokemon?.stats.defense}</td>
                </tr>
                <tr>
                  <td className="label">Velocidad:</td>
                  <td className="value">{pokemon?.stats.speed}</td>
                </tr>
                <tr>
                  <td className="label">Especial Ataque:</td>
                  <td className="value">{pokemon?.stats.specialAttack}</td>
                </tr>
                <tr>
                  <td className="label">Especial Defensa:</td>
                  <td className="value">{pokemon?.stats.specialDefense}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ReadyToBattle />
      </div>
    </>
  );
};

export default PokemonDetail;
