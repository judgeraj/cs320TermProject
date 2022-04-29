import React from "react";

import MovieItem from "./MovieItem";
import Emoji from "./Emoji";

import "./styles/Movies.css";

function Movies(props) {
  return (
    <>
      <h4 className="title">Top 10 Movie Ratings</h4>
      <div className="movie-table">
        <div className="movie-col">
          <Emoji symbol="👍 😀 🍿" label="thumbs up and happy and movie" />
          {props.moviesRated
            .filter((movieRating) => movieRating.bool === true)
            .slice(0, 10)
            .map((movieRating, index) => (
              <MovieItem
                key={index}
                liked={movieRating.bool}
                title={movieRating.title}
              />
            ))}
        </div>
        <div className="movie-col">
          <Emoji symbol="👎 😑" label="thumbs down not good" />
          {props.moviesRated
            .filter((movieRating) => movieRating.bool !== true)
            .slice(0, 10)
            .map((movieRating, index) => (
              <MovieItem
                key={index}
                liked={movieRating.bool}
                title={movieRating.title}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Movies;
