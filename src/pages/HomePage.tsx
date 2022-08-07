import React from "react";
import { useSearchUserQuery } from "../store/github/github-api";

export const HomePage = () => {
  const { isLoading, isError, data } = useSearchUserQuery("vladilen");
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-500">Something went wrong...</p>
      )}
    </div>
  );
};
