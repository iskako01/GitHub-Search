import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepos } from "../models/models";

interface PropsType {
  repo: IRepos;
}

export const RepoCard: React.FC<PropsType> = ({ repo }) => {
  const { addFavote, removeFavote } = useActions();
  const favorites = useAppSelector((state) => state.github.favorites);
  const [isFavorite, setIsFavorite] = useState(favorites.includes(repo));
  console.log(favorites);

  const addToFavorite = (repo: IRepos) => {
    addFavote(repo);
    setIsFavorite(true);
  };

  const removeFromFavorite = (repo: IRepos) => {
    removeFavote(repo);
    setIsFavorite(false);
  };

  return (
    <div className="border py-3 px-5 rounded-md-2 hover:shadow-md hover:bg-slate-100 transition-all">
      <div className="border p-2">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks:<span className="font-bold mr-2">{repo.forks}</span>
          watchers:<span className="font-bold mr-2">{repo.watchers}</span>
        </p>
        <a className=" text-blue-600 " href={repo.html_url}>
          {repo.html_url}
        </a>
      </div>

      <div className="flex justify-between pt-2">
        {!isFavorite ? (
          <button
            className="py-2 px-4 bg-yellow-300 rounded hover:shadow-md transition-all"
            onClick={() => addToFavorite(repo)}
          >
            Add to favorites
          </button>
        ) : (
          <button
            className="py-2 px-4 bg-red-300 rounded hover:shadow-md transition-all"
            onClick={() => removeFromFavorite(repo)}
          >
            Remove from favorites
          </button>
        )}
      </div>
    </div>
  );
};
