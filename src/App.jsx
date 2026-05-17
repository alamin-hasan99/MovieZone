import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import MovieDetailsModal from "./components/MovieDetailsModal";
import Navigation from "./components/Navigation";
import NavLogo from "./components/NavLogo";
import NavNumber from "./components/NavNumber";
import NavSearch from "./components/NavSearch";
import NavSearchModal from "./components/NavSearchModal";
import ShowListBox from "./components/ShowListBox";
import ShowListBoxBtn from "./components/ShowListBoxBtn";
import ShowListBoxOne from "./components/ShowListBoxOne";
import ShowListBoxTwo from "./components/ShowListBoxTwo";
import WatchedMovieBox from "./components/WatchedMovieBox";
import { useFetchMovie } from "./customHooks/useFetchMovie";

export default function App() {
  const [quary, setQuary] = useState("");
  const [selected, setSelected] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [shows, setShows] = useState(true);
  const [watched, setWatched] = useState(function () {
    const storeValue = localStorage.getItem("Watched");
    return JSON.parse(storeValue);
  });
  // Custom Hooks
  const [searchResults, loading, movies, error] = useFetchMovie(quary);

  function handleSelectedMovieID(id) {
    setSelected(id);
  }

  function handleWatchedMovies(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("Watched", JSON.stringify(watched));
    },
    [watched],
  );

  return (
    <>
      <Navigation>
        <NavLogo />
        <NavSearch setOpen={setOpen} quary={quary} />
        {open && (
          <NavSearchModal
            searchResults={searchResults}
            setOpen={setOpen}
            quary={quary}
            setQuary={setQuary}
            setIsDetailsOpen={setIsDetailsOpen}
            onSelectedMovieID={handleSelectedMovieID}
          />
        )}
        <NavNumber movies={movies} />
      </Navigation>

      <main className="mt-5 md:h-[85vh] flex items-center md:items-start md:justify-center flex-col md:flex-row gap-7">
        <ShowListBox>
          <ShowListBoxBtn shows={shows} setShows={setShows} />

          {shows ? (
            error ? (
              <p className="error">
                You didn't input a valid movie name. Search again with a valid
                name.
              </p>
            ) : loading ? (
              <Loading />
            ) : (
              <ShowListBoxOne
                movies={movies}
                onSelectedMovieID={handleSelectedMovieID}
                setIsDetailsOpen={setIsDetailsOpen}
              />
            )
          ) : (
            <ShowListBoxTwo />
          )}
        </ShowListBox>
        <WatchedMovieBox
          watched={watched}
          onDeleteWatched={handleDeleteWatched}
        />

        {isDetailsOpen && (
          <MovieDetailsModal
            selected={selected}
            watched={watched}
            onCloseMovieDetails={() => setIsDetailsOpen(false)}
            onWatchedMovies={handleWatchedMovies}
          />
        )}
      </main>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        transition={Bounce}
      />
    </>
  );
}
