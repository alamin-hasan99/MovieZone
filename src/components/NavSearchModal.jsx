import { useEffect, useState } from "react";

export default function NavSearchModal({
  setOpen,
  searchResults,
  quary,
  setQuary,
  setIsDetailsOpen,
  onSelectedMovieID,
}) {
  const [input, setInput] = useState(quary);

  // debouncing
  useEffect(() => {
    if (input.trim().length < 3) {
      setQuary("");
      return;
    }
    const timer = setTimeout(() => {
      setQuary(input);
    }, 1000);

    return () => clearTimeout(timer);
  }, [input, setQuary]);

  return (
    <div
      className="fixed inset-0 backdrop-blur-[6px] flex justify-center items-start pt-24 z-999"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-150 max-w-[90%] bg-primary p-5 rounded-md animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          className="w-full px-4 py-3 text-base rounded-lg border-0 outline-none bg-primary-light text-text shadow-[0_2.4rem_2.4rem_rgba(0,0,0,0.1)] placeholder-text-dark transition-all duration-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setQuary(input);
              setOpen(false);
              setInput("");
            }

            if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search movies"
          autoFocus
        />

        <div className="mt-2.5 overflow-y-auto max-h-[85vh] scrollbar-none transition-all duration-500 flex flex-col gap-y-2 ">
          {input.trim() === "" ? (
            <p className="text-center text-[1rem] text-text">Start Typing 💬</p>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-[1rem] text-text">No result found</p>
          ) : (
            searchResults.map((movie) => (
              <ul className="w-full flex flex-col gap-y-2 " key={movie.imdbID}>
                <li
                  className="list-none flex items-center gap-4 md:py-2 md:px-3 transition-all duration-300 hover:bg-background-100 hover:rounded-xl cursor-pointer"
                  onClick={() => {
                    onSelectedMovieID(movie.imdbID);
                    setIsDetailsOpen(true);
                    setOpen(false);
                  }}
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-24 rounded-[0.9rem] object-cover"
                  />
                  <div>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                  </div>
                </li>
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
