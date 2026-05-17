export default function ItemBox({
  movie,
  onSelectedMovieID,
  setIsDetailsOpen,
}) {
  return (
    <li
      className="flex flex-col w-60 rounded-xl bg-[#111] text-white cursor-pointer overflow-hidden transition-all duration-350 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:outline-2 hover:outline-primary"
      onClick={() => {
        onSelectedMovieID(movie.imdbID);
        setIsDetailsOpen(true);
      }}
    >
      <div className="w-full h-80 overflow-hidden">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover scale-100 transition-transform duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:scale-96"
        />
      </div>
      <div className=" flex items-center gap-3 p-3">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </li>
  );
}
