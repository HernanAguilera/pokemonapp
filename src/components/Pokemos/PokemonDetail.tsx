import { useEffect, useState } from "react";
import { Pokemon } from "../../models";
import { getPokemon } from "../../requests/pokemons";
import { Link, useParams } from "react-router-dom";
import { setLoading } from "../../state/generalSlice";
import { useDispatch } from "react-redux";
import "./Pokemon.css";
import ReadyToBattle from "./readyToBattle";

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState<Pokemon>();
  let { id } = useParams();

  const capitalize = (str?: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (!id) return;
    dispatch(setLoading(true));
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
      .finally(() => {
        dispatch(setLoading(false));
        console.log("fin");
      });
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="detail-content">
          <div className="detail-header">
            <div className="back-button">
              <Link to="/">← Volver</Link>
            </div>
            <div className="pokemon-image-large">
              <img src={pokemon?.image} alt="pokemon" />
              <h1 style={{ marginBottom: "10px", textAlign: "center" }}>
                {capitalize(pokemon?.name)}
              </h1>
            </div>
            <div>
              <button className="add-to-list">Agregar a la lista</button>
            </div>
          </div>
          <div className="pokemon-details">
            <table style={{ width: "100%" }}>
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
            </table>
          </div>
        </div>

        <ReadyToBattle />
      </div>
    </>
  );
};

export default PokemonDetail;
