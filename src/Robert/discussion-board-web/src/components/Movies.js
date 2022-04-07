import React, { useEffect, useState } from "react";
import Header from "./Header";
import MovieCards from "./MovieCards";
import SwipeButtons from "./SwipeButtons";
import StreamButtons from "./StreamButtons";
import "./Movies.css";
import Movie from "./Movie";

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7ecd0b11bc4cd387a22b43cb37086584";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=7ecd0b11bc4cd387a22b43cb37086584&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  return (
    // <div>{movies.length > 0 && movies.map((movie) => <Movie />)}
    <div className="Movies">
      <Header />
      <StreamButtons />
      <MovieCards />
      <SwipeButtons />
    </div>
    // </div>
  );
}
export default Movies;
