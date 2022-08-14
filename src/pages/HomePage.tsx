import React, { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import {
  useLazySearchUserQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github-api";

export const HomePage = () => {
  const [search, setSearch] = useState("iskako01");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const [fetchUsers, { isLoading, isError, data: users }] =
    useLazySearchUserQuery();
  const [
    fetchRepos,
    { isLoading: reposLoading, isError: reposError, data: userRepos },
  ] = useLazyGetUserReposQuery();

  const handleSearch = () => {
    setDropdown(true);
    fetchUsers(debounced);
  };
  const handleUser = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  useEffect(() => {
    setDropdown(users?.length! > 0);
  }, [debounced]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError ? (
        <p className="text-center text-red-500">Something went wrong...</p>
      ) : (
        <div className="relative w-[560px]">
          <div className="flex">
            <input
              type="text"
              className="border py-2 px-2 w-full h-[42px] mr-5 rounded-md"
              placeholder="Search for GitHub username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="border p-2 bg-slate-700 text-violet-50 rounded-md hover:bg-slate-400"
            >
              Search
            </button>
          </div>

          {dropdown && (
            <ul className="list none absolute top-[42px] left-0 right-0 shadow-md bg-white h-[250px] overflow-y-auto">
              {users?.map((user) => (
                <li
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                  key={user.id}
                  onClick={() => handleUser(user.login)}
                >
                  {user.login}
                </li>
              ))}
            </ul>
          )}
          <div className="container">
            {reposLoading && (
              <p className="text-center">Repos are loading...</p>
            )}
            {reposError ? (
              <p className="text-center text-danger">Something went wrong...</p>
            ) : (
              <div>
                {userRepos?.map((repo) => (
                  <RepoCard repo={repo} key={repo.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
