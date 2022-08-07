import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { useSearchUserQuery } from "../store/github/github-api";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUserQuery(debounced, {
    skip: debounced.length < 3,
  });

  const handleSearch = () => {};

  useEffect(() => {
    console.log(debounced);
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

          <ul className="list none absolute top-[42px] left-0 right-0 shadow-md bg-white">
            {data?.map((user) => (
              <li key={user.id}>{user.login}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
