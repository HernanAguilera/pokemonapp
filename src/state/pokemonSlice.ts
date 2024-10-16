import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../models";

interface PokemonsState {
  pokemons: Pokemon[];
  readyToBattle: Pokemon[];
}

const initialState: PokemonsState = {
  pokemons: [],
  readyToBattle: [],
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addPokemons: (state, action) => {
      state.pokemons.push(action.payload);
    },
    removePokemons: (state, action) => {
      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    addToreadyToBattle: (state, action) => {
      state.readyToBattle = action.payload;
    },
    removeToreadyToBattle: (state, action) => {
      state.readyToBattle = state.readyToBattle.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    resetState: (state) => {
      state.pokemons = [];
      state.readyToBattle = [];
    },
  },
});

export const {
  addPokemons,
  removePokemons,
  addToreadyToBattle,
  removeToreadyToBattle,
  resetState,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
