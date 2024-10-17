import { useEffect } from "react";
import "./Pokemon.css";
import { getPokemons } from "../../requests/pokemons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "../../state/generalSlice";
import {
  addToreadyToBattle,
  setOriginalPokemons,
  setPokemons,
} from "../../state/pokemonSlice";
import { PokemonItem } from "../../models";
import ReadyToBattle from "./readyToBattle";
import { capitalize } from "../../utils";

function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state: any) => state.pokemons.pokemons);
  const readyToBattle = useSelector(
    (state: any) => state.pokemons.readyToBattle
  );
  const originalItems = useSelector(
    (state: any) => state.pokemons.originalPokemons
  );

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(setLoading(true));
      getPokemons()
        .then((data) => {
          const dataResults = data.results.map(
            (pokemon: any, index: number) => {
              return {
                id: index + 1,
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`,
              };
            }
          );
          dispatch(setPokemons(dataResults));
          dispatch(setOriginalPokemons(dataResults));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, []);

  console.log({ originalItems });

  const searchPokemon = (e: any) => {
    const search = e.target.value;
    if (search === "") {
      dispatch(setPokemons(originalItems));
      return;
    }
    dispatch(
      setPokemons(
        originalItems.filter((item: any) => {
          if (parseInt(search) === parseInt(item.id)) {
            return true;
          }
          return item.name.toLowerCase().includes(search.toLowerCase());
        })
      )
    );
  };

  const addPokemonToBattle = (pokemon: PokemonItem) => {
    dispatch(addToreadyToBattle([...readyToBattle, pokemon]));
  };

  const isReadyToBattle = (pokemon: PokemonItem): boolean => {
    return readyToBattle.some((item: PokemonItem) => item.id === pokemon.id);
  };

  return (
    <>
      <div className="container">
        <div className="main-content">
          <input
            type="text"
            placeholder="Que pokemon buscas..."
            className="search-bar"
            onChange={searchPokemon}
          />

          <div className="pokemon-list">
            {pokemons.map((item: PokemonItem) => (
              <div className="pokemon-item" key={item.id}>
                <div className="pokemon-image">
                  <Link to={`/pokemons/${item.id}`}>
                    <img key={item.id} src={item.image} alt="pokemon" />
                  </Link>
                </div>
                <p className="pokemon-name">
                  <Link to={`/pokemons/${item.id}`}>
                    {capitalize(item.name)}
                  </Link>
                </p>
                {!isReadyToBattle(item) && (
                  <button
                    className="add-button"
                    onClick={() => addPokemonToBattle(item)}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <ReadyToBattle />
      </div>
    </>
  );
}

export default PokemonList;
