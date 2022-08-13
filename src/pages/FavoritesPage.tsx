import React from "react";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepos } from "../models/models";

export const FavoritesPage = () => {
  const { removeFavote } = useActions();
  const favorites = useAppSelector((state) => state.github.favorites);

  const removeFromFavorite = (repo: IRepos) => {
    removeFavote(repo);
  };

  return (
    <div className="pt-10 mx-auto h-screen max-w-[500px]">
      <h2 className="text-lg text-center font-bold">Favorites</h2>
      {favorites.map((favorit) => (
        <div className="border py-3 px-5 rounded-md-2 hover:shadow-md hover:bg-slate-100 transition-all">
          <div className="border p-2">
            <h2 className="text-lg font-bold">{favorit.full_name}</h2>
            <p className="text-sm">
              Forks:<span className="font-bold mr-2">{favorit.forks}</span>
              watchers:
              <span className="font-bold mr-2">{favorit.watchers}</span>
            </p>
            <a className=" text-blue-600 " href={favorit.html_url}>
              {favorit.html_url}
            </a>
          </div>

          <div className="flex justify-between pt-2">
            <button
              className="py-2 px-4 bg-red-300 rounded hover:shadow-md transition-all"
              onClick={() => removeFromFavorite(favorit)}
            >
              Remove from favorites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
