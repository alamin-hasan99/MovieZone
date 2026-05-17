import { useEffect, useState } from "react";
import Loading from "./Loading";
import RatingSystem from "./RatingSystem";


export default function MovieDetailsModal({
  selected,
  watched,
  onCloseMovieDetails,
  onWatchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    Poster,
    Title,
    Year,
    Writer,
    Actors,
    Director,
    Awards,
    Country,
    Released,
    Runtime,
    imdbRating,
    Plot,
    BoxOffice,
    imdbVotes,
  } = movie;

  function handleAdd() {
    const watchedNewMovies = {
      imdbID: selected,
      Poster,
      Title,
      Year,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
      userRating,
    };
    onWatchedMovies(watchedNewMovies);
  }

  const isWatched = watched?.some((m) => m.imdbID === selected);
  // const isWatched = watched.map((movie) => movie.imdbID).includes(selected);
  // const isWatched = (watched || [])
  // .map((movie) => movie.imdbID)
  // .includes(selected);

  useEffect(
    function () {
      async function selectedmoviesDetails() {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APP_API_KEY}&i=${selected}`,
        );
        const data = await res.json();
        if (data.Response === "False") return;
        setMovie(data);
        setLoading(false);
      }
      selectedmoviesDetails();
    },
    [selected],
  );
  useEffect(
    function () {
      if (!Title) return;
      document.title = Title;

      return function () {
        document.title = "MovieZone";
      };
    },
    [Title],
  );

  return (
    <div className="fixed inset-0 backdrop-blur-[6px] flex justify-center items-start pt-14 md:pt-24 z-999">
      {loading ? (
        <Loading />
      ) : (
        <div
          className="relative w-[90vw] md:w-[90vw] lg:w-[45vw] bg-black/90 text-white py-5 px-3 md:p-6 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:gap-9 gap-4  animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" flex justify-center gap-6">
            <img
              src={Poster}
              alt={Title}
              className=" w-20 h-32 md:w-60 md:h-90 "
            />
            <div className=" flex gap-0.5 md:gap-2 flex-col">
              <h2 className="text-[clamp(1.2rem, 3vw, 1.8rem)] font-bold">
                {Title}
              </h2>
              <p>
                {" "}
                <b>Released:</b> {Released}
              </p>
              <p className="details-box-p">
                {" "}
                <b>Duration:</b> {Runtime}
              </p>
              <p>
                <b>Country:</b> {Country}
              </p>
              <p>
                <b>Year:</b> {Year}
              </p>
              <p>
                {" "}
                <b>BoxOffice: </b> {BoxOffice}
              </p>
              <p>
                {" "}
                <b>Votes: </b> {imdbVotes}
              </p>
              <p>
                {" "}
                <b>Rating: ⭐</b> {imdbRating} IMDB{" "}
              </p>
            </div>
          </div>

          <div>
            <RatingSystem
              onCloseMovieDetails={onCloseMovieDetails}
              onhandleAdd={handleAdd}
              onRating={setUserRating}
              isWatched={isWatched}
            />
            <p>
              {" "}
              <em>{Plot}</em>
            </p>
            <p>
              <b>Writer:</b> {Writer}
            </p>
            <p>
              <b>Actors:</b> {Actors}
            </p>
            <p>
              <b>Director:</b> {Director}
            </p>
            <p>
              <b>Awards:</b> {Awards}
            </p>
          </div>
          <button
            onClick={onCloseMovieDetails}
            className="block absolute md:top-3 top-0.5 md:right-3 right-0.5 cursor-pointer text-white border-0 md:text-[16px] px-[0.8rem] py-[0.2rem] md:rounded-md md:bg-black/90 transition-all duration-300 ease-out hover:bg-[#e50914]"
          >
            &#x2715;
          </button>
        </div>
      )}
    </div>
  );
}
