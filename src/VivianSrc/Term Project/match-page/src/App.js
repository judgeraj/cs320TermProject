import React, {useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './Header';
import MovieCards from './MovieCards';
import SwipeButtons from "./SwipeButtons";
import StreamButtons from "./StreamButtons";
import './App.css';
import Movie from "./Movie"


const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7ecd0b11bc4cd387a22b43cb37086584";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=7ecd0b11bc4cd387a22b43cb37086584&query="
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";



function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(APIURL).then(res => res.json())
    .then(data => {
      console.log(data);
      setMovies(data);
    });
  }, [])

  return (
    // <div>{movies.length > 0 && movies.map((movie) => <Movie />)}
    <div className="App">
      
      <Router>
        <Switch>   
          <Route path="/friends">
            <Header backButton="/" /> {/*keeps header across pages*/}
              <h1> I am the friends page</h1>
          </Route>
          <Route path="/">    {/*default route at bottom*/}    
            <Header />
            <StreamButtons/>
            <MovieCards />
            {/* <SwipeButtons>
            </SwipeButtons> */}
          </Route>
        </Switch>
      </Router>
    </div>
    // </div>
  );
}
export default App;
