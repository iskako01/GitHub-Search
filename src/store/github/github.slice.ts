import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRepos } from "../../models/models";

interface GitHubState {
  favorites: IRepos[];
}

const initialState: GitHubState = {
  favorites: JSON.parse(localStorage.getItem("favorites") ?? "[]"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavote(state: GitHubState, action: PayloadAction<IRepos>) {
      state.favorites = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavote(state: GitHubState, action: PayloadAction<IRepos>) {
      state.favorites = state.favorites.filter(
        (f) => f.name !== action.payload.name
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
