import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../models";

interface PokemonsState {
  originalPokemons: Pokemon[];
  pokemons: Pokemon[];
  readyToBattle: Pokemon[];
}

const initialState: PokemonsState = {
  originalPokemons: JSON.parse(localStorage.getItem("pokemons") ?? "[]"),
  pokemons: JSON.parse(localStorage.getItem("pokemons") ?? "[]"),
  readyToBattle: JSON.parse(localStorage.getItem("readyToBattle") ?? "[]"),
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      localStorage.setItem("pokemons", JSON.stringify(state.pokemons));
    },
    addPokemons: (state, action) => {
      state.pokemons.push(action.payload);
    },
    removePokemons: (state, action) => {
      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    addToreadyToBattle: (state, action) => {
      if (action.payload.length > 6) {
        alert("No puedes agregar más de 6 pokemones a la lista");
        return;
      }
      state.readyToBattle = action.payload;
      localStorage.setItem(
        "readyToBattle",
        JSON.stringify(state.readyToBattle)
      );
    },
    removeToreadyToBattle: (state, action) => {
      state.readyToBattle = state.readyToBattle.filter(
        (pokemon) => pokemon.id !== action.payload
      );
      if (state.readyToBattle.length === 0) {
        localStorage.removeItem("readyToBattle");
      } else {
        localStorage.setItem(
          "readyToBattle",
          JSON.stringify(state.readyToBattle)
        );
      }
    },
    resetState: (state) => {
      state.pokemons = state.originalPokemons;
      state.readyToBattle = [];
      localStorage.setItem("pokemons", JSON.stringify(state.pokemons));
      localStorage.setItem(
        "readyToBattle",
        JSON.stringify(state.readyToBattle)
      );
    },
  },
});

export const {
  setPokemons,
  addPokemons,
  removePokemons,
  addToreadyToBattle,
  removeToreadyToBattle,
  resetState,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
