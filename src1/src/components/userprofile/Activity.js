import React, { useState, useEffect } from "react";
import database from "../../firebase/firebase";

import MovieItem from "./MovieItem";

import "./styles/Activity.css";
import "./styles/UserProfile.css";

function Activity(props) {
  //const [discussions, setDiscussions] = useState([]);
  const [moviesRated, setMoviesRated] = useState([]);

  useEffect(() => {
    database.collection(props.user.displayName).onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        /*
        console.log(doc.data().title);
        const updatedMoviesRated = [...moviesRated, doc.data()];
        setMoviesRated(updatedMoviesRated);
        */
        setMoviesRated((moviesRated) => [...moviesRated, doc.data()]);
      });
    });
  }, []);

  //console.log(moviesRated);
  return (
    <div className="info">
      <div className="info-activity">
        <h3>Activity</h3>
        <hr />
        <h4>Movie Ratings</h4>
        <table>
          <tbody>
            {moviesRated
              .filter((movieRating) => movieRating.bool === true)
              .map((movieRating, index) => (
                <MovieItem
                  key={index}
                  liked={movieRating.bool}
                  title={movieRating.title}
                />
              ))}
            {moviesRated
              .filter((movieRating) => movieRating.bool !== true)
              .map((movieRating, index) => (
                <MovieItem
                  key={index}
                  liked={movieRating.bool}
                  title={movieRating.title}
                />
              ))}
          </tbody>
        </table>
        <hr />
        <h4>Messages</h4>
      </div>
    </div>
  );
}

export default Activity;
