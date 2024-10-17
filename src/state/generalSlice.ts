import { createSlice } from "@reduxjs/toolkit";

interface GeneralState {
  searchQuery: string;
  loading: boolean;
}

const initialState: GeneralState = {
  searchQuery: "",
  loading: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSearchQuery, setLoading } = generalSlice.actions;

export default generalSlice.reducer;
