import { PokemonItem } from "../../models";
import { removeToreadyToBattle } from "../../state/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";

const ReadyToBattle = () => {
  const dispatch = useDispatch();
  const readyToBattle = useSelector(
    (state: any) => state.pokemons.readyToBattle
  );

  const removePokemonFromBattle = (id: number) => {
    dispatch(removeToreadyToBattle(id));
  };

  return (
    <div className="combat-list">
      <h2>Listos para el combate</h2>
      <div className="combat-ready">
        {readyToBattle.length > 0 ? (
          readyToBattle.map((item: PokemonItem) => (
            <>
              <div className="pokemon-item" key={item.id}>
                <div className="combat-image">
                  <img key={item.id} src={item.image} alt="pokemon" />
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
  );
};

export default ReadyToBattle;
