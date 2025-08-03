import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieDetails from "./MovieDetails";
import Nav from "./Nav";  
import "../styles/MovieApp.css";
import loadingImage from "../styles/assets/Loadingstate.png";
import movieLoadingImg from "../styles/assets/loadingMovie.avif"; 



const MovieApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const location = useLocation();
  const API_KEY = "b5b98c80";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    if (query) setSearchTerm(query);
  }, [location.search]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    const delayDebounce = setTimeout(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("https://www.omdbapi.com/", {
          params: {
            apikey: API_KEY,
            s: searchTerm,
            type: "movie",
          },
        });

        if (response.data.Response === "True") {
          setMovies(response.data.Search.slice(0, 6));
        } else {
          setMovies([]);
          setError(response.data.Error || "No movies found");
        }
      } catch (err) {
        console.error("Axios fetch error:", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchMovies();
  }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const filteredMovies = movies
    .filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "A__TO__Z") return a.Title.localeCompare(b.Title);
      if (filter === "Z__TO__A") return b.Title.localeCompare(a.Title);
      if (filter === "Year") {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        return yearB - yearA; // Newest first
      }
      return 0;
    });

  return (
    <>
      <Nav />
      <main>
        <header>
          <h1>🎬 Movie Search</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="" disabled>
            Sort
          </option>
          <option value="A__TO__Z">Title, A to Z</option>
          <option value="Z__TO__A">Title, Z to A</option>
          <option value="Year">Year</option>
        </select>
    
        {loading && (
           <div className="fullscreen-loading">
           <img src={loadingImage} alt="Loading..." className="loading-image" />
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <div className="movie__container">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie__container--wrapper"
                onClick={() => setSelectedMovie(movie.imdbID)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelectedMovie(movie.imdbID);
                }}
              >
                {movie.Poster && movie.Poster !== "N/A" && (
                  <img
                    className="movie__container--img"
                    src={movie.Poster}
                    alt={`${movie.itle} poster`}
                  />
                )}
                <h3 className="movie__container--title">{movie.Title}</h3>
                <p className="movie__container--subtitle">Year: {movie.Year}</p>
              </div>
            ))
          ) : (
            !loading &&
            !error && (
              <div className="movie__container--wrapper">
                <h3 className="movie__container--title">
                  Find <span>Your Favorite Movies</span> Instantly!
                </h3>
                <p className="movie__container--subtitle">
                  Search through thousands of titles and discover your next
                  great watch.
                </p>
                <img className="movie-loading__img" src={movieLoadingImg} alt="" />
              </div>
            )
          )}
        </div>

        {selectedMovie && (
          <MovieDetails
            imdbID={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </main>
    </>
  );
};

export default MovieApp;
