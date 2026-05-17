import { useState } from "react";
import { toast } from "react-toastify";

export default function WatchedMovieBox({ watched, onDeleteWatched }) {
  const [shows, setShows] = useState(true);
  const safeWatched = watched || [];

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setShows(!shows)}>
        {shows ? "-" : "+"}
      </button>
      {shows && (
        <>
          <div className="py-4 px-4 rounded-[0.9rem] bg-background-100 shadow-[0_1.2rem_2.4rem_rgba(0,0,0,0.2)]">
            <h2 className=" capitalize text-[16px] font-bold">
              Movies you watched
            </h2>
            <div className=" flex items-center gap-2 md:gap-3">
              <p>
                <span>🎬</span>
                <span>{safeWatched.length}</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>
                  {(
                    safeWatched.reduce(
                      (acc, movie) => acc + Number(movie.imdbRating),
                      0,
                    ) / safeWatched.length || 0
                  ).toFixed(1)}
                </span>
              </p>
              <p>
                <span>🌟</span>
                <span>
                  {(
                    safeWatched.reduce(
                      (acc, movie) => acc + Number(movie.userRating),
                      0,
                    ) / safeWatched.length || 0
                  ).toFixed(1)}
                </span>
              </p>
              <p>
                <span>⏳</span>
                <span>
                  {(
                    safeWatched.reduce(
                      (acc, movie) => acc + Number(movie.Runtime),
                      0,
                    ) / safeWatched.length || 0
                  ).toFixed(1)}{" "}
                  min
                </span>
              </p>
            </div>
          </div>

          <ul className="w-full flex flex-col gap-6 md:p-8 p-4 overflow-y-auto scrollbar-none transition-all duration-500 max-h-[85vh]">
            {safeWatched.map((movie) => (
              <li
                className="relative list-none flex items-center gap-4 md:gap-7 md:p-4 hover:bg-background-100"
                key={movie.imdbID}
              >
                <img
                  className="w-24 rounded-lg"
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                />
                <div className=" flex flex-col md:gap-3.5">
                  <h3>{movie.Title}</h3>
                  <div className=" flex flex-row md:gap-4 gap-2">
                    <p>
                      <span>⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{movie.Runtime} min</span>
                    </p>
                  </div>
                </div>
                <button
                  className="absolute md:right-[2.4rem] right-0.5 h-6 aspect-square rounded-full border-none bg-red text-background-900 text-[1rem] font-bold cursor-pointer transition-all duration-300 grid place-items-center hover:bg-red-dark"
                  onClick={() => {
                    onDeleteWatched(movie.imdbID);
                    toast.info("Movie Removed!");
                  }}
                >
                  &#x2715;
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
