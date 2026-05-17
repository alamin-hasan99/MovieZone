import { useEffect, useState } from "react";
const VITE_APP_API_KEY = "23f04781";
export function useFetchMovie(quary) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controllar = new AbortController();
      async function featchingMovies() {
        try {
          setLoading(true);
          const searchQuery = quary.trim() === "" ? "Harry Potter" : quary;
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_APP_API_KEY || VITE_APP_API_KEY}&s=${searchQuery}`,
            { signal: controllar.signal },
          );

          if (!res.ok) {
            throw new Error("Data Featching Problems. Try Again...!");
          }

          const data = await res.json();

          if (data.Response === "False") {
            setMovies([]);
            setSearchResults([]);
            setError(data.Error);
          } else {
            setMovies(data.Search || []);
            setSearchResults(data.Search || []);
            setError("");
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
          setError("");
        } finally {
          setLoading(false);
        }
      }

      featchingMovies();
      return function () {
        controllar.abort();
      };
    },
    [quary],
  );

  return [searchResults, loading, movies, error];
}
