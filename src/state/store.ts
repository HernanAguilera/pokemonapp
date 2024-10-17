import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import generalReducer from "./generalSlice";

export default configureStore({
  reducer: {
    general: generalReducer,
    pokemons: pokemonReducer,
  },
});
