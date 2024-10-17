import { useEffect, useState } from "react";
import "./App.css";
import { getPokemons } from "./requests/pokemons";

interface PokemonItem {
  id: number;
  name: string;
  image: string;
}

function App() {
  const [originalItems, setOriginalItems] = useState<PokemonItem[]>([]);
  const [items, setItems] = useState<PokemonItem[]>([]);
  const [readyToBattle, setReadyToBattle] = useState<PokemonItem[]>([]);

  useEffect(() => {
    if (localStorage.getItem("pokemons")) {
      setOriginalItems(JSON.parse(localStorage.getItem("pokemons") ?? "[]"));
    } else {
      getPokemons().then((data) => {
        console.log(data.results.length);
        const dataResults = data.results.map((pokemon: any, index: number) => {
          return {
            id: index + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setOriginalItems(dataResults);
        localStorage.setItem("pokemons", JSON.stringify(dataResults));
      });
    }
    if (localStorage.getItem("readyToBattle")) {
      setReadyToBattle(
        JSON.parse(localStorage.getItem("readyToBattle") ?? "[]")
      );
    }
  }, []);

  useEffect(() => {
    setItems(originalItems);
  }, [originalItems]);

  const searchPokemon = (e: any) => {
    const search = e.target.value;
    if (search === "") {
      setItems(originalItems);
      return;
    }
    setItems(
      items.filter((item: any) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  };

  const addPokemonToBattle = (pokemon: PokemonItem) => {
    setReadyToBattle((prevState) => [...prevState, pokemon]);
    localStorage.setItem(
      "readyToBattle",
      JSON.stringify([...readyToBattle, pokemon])
    );
  };

  const removePokemonFromBattle = (id: number) => {
    const PokemonList = readyToBattle.filter((item) => item.id !== id);
    setReadyToBattle(PokemonList);
    if (PokemonList.length === 0) {
      localStorage.removeItem("readyToBattle");
    } else {
      localStorage.setItem("readyToBattle", JSON.stringify(PokemonList));
    }
  };

  const isReadyToBattle = (pokemon: PokemonItem): boolean => {
    return readyToBattle.some((item) => item.id === pokemon.id);
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
            {items.map((item, index) => (
              <div className="pokemon-item" key={index}>
                <div className="pokemon-image">
                  <a href={`/pokemons/${item.id}`}>
                    <img key={index} src={item.image} alt="pokemon" />
                  </a>
                </div>
                <p className="pokemon-name">{item.name}</p>
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

        <div className="combat-list">
          <h2>Listos para el combate</h2>
          <div className="combat-ready">
            {readyToBattle.length > 0 ? (
              readyToBattle.map((item, index) => (
                <>
                  <div className="pokemon-item" key={index}>
                    <div className="combat-image">
                      <img key={index} src={item.image} alt="pokemon" />
                    </div>
                    <p className="combat-name">{item.name}</p>
                    <button
                      className="remove-button"
                      onClick={() => removePokemonFromBattle(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                </>
              ))
            ) : (
              <p>No hay pokemones listos para el combate</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
