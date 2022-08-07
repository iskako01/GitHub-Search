import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="w-full flex justify-between p-2 bg-slate-600 text-white">
      <h3 className="font-bold">GitHub Search</h3>

      <div className="flex justify-between">
        <span className="mr-2 ml-2s">
          <Link to="/">Home</Link>
        </span>

        <span className="mr-2 ml-2s">
          <Link to="/favorites">Favorites</Link>
        </span>
      </div>
    </div>
  );
};
