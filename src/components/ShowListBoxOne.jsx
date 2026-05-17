import ItemBox from "./ItemBox";

export default function ShowListBoxOne({
  movies,
  onSelectedMovieID,
  setIsDetailsOpen,
}) {
  return (
    <ul className="list-none w-full grid grid-cols-1 place-items-center sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-[1.4rem] gap-y-[2.8rem] p-8 max-h-[85vh] overflow-y-auto scrollbar-none transition-all duration-500">
      {movies?.map((movie) => (
        <ItemBox
          key={movie.imdbID}
          movie={movie}
          onSelectedMovieID={onSelectedMovieID}
          setIsDetailsOpen={setIsDetailsOpen}
        />
      ))}
    </ul>
  );
}
