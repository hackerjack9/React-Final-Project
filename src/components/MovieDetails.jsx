import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MovieApp.css"; 

const MovieDetails = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = "b5b98c80";

  useEffect(() => {
    if (!imdbID) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("https://www.omdbapi.com/", {
          params: {
            apikey: API_KEY,
            i: imdbID,
            plot: "full",
          },
        });

        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error || "Movie details not found.");
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  if (loading)
    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          Loading movie details...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p className="error">{error}</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );

  if (!movie) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>
          {movie.Title} ({movie.Year})
        </h2>
        {movie.Poster && movie.Poster !== "N/A" && (
          <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        )}
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>IMDB Rating:</strong> {movie.imdbRating}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
